<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Setting;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;

class AdminSettingsController extends Controller
{
    public function getSettings()
    {
        try {
            $currentUser = Auth::user();

            $adminInfo = [
                'admin_email' => $currentUser->email,
                'admin_password' => ''
            ];

            $emailSettings = [
                'mail_host' => $this->getSetting('mail_host', config('mail.mailers.smtp.host')),
                'mail_port' => $this->getSetting('mail_port', config('mail.mailers.smtp.port')),
                'mail_username' => $this->getSetting('mail_username', config('mail.mailers.smtp.username')),
                'mail_password' => '', // Never return password to frontend
                'mail_encryption' => $this->getSetting('mail_encryption', config('mail.mailers.smtp.encryption')),
                'mail_from_address' => $this->getSetting('mail_from_address', config('mail.from.address')),
                'mail_from_name' => $this->getSetting('mail_from_name', config('mail.from.name')),
            ];

            return response()->json([
                'success' => true,
                'data' => [
                    'admin_info' => $adminInfo,
                    'email_settings' => $emailSettings
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des paramètres.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateAdmin(Request $request)
    {
        try {
            $currentUser = Auth::user();

            $validator = Validator::make($request->all(), [
                'admin_email' => 'required|email|unique:users,email,' . $currentUser->id . ',id',
                'admin_password' => 'nullable|string|min:8|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreurs de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $currentUser->email = $request->admin_email;

            if ($request->filled('admin_password')) {
                $currentUser->password = Hash::make($request->admin_password);
            }

            $currentUser->save();

            return response()->json([
                'success' => true,
                'message' => 'Informations administrateur mises à jour avec succès.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour des informations administrateur.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateEmail(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'mail_host' => 'required|string|max:255',
                'mail_port' => 'required|numeric|between:1,65535',
                'mail_username' => 'required|email|max:255',
                'mail_password' => 'required|string|max:255',
                'mail_encryption' => 'required|in:tls,ssl',
                'mail_from_address' => 'required|email|max:255',
                'mail_from_name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreurs de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Clean and store password
            $cleanPassword = trim($request->mail_password);
            
            $settings = [
                'mail_host' => $request->mail_host,
                'mail_port' => $request->mail_port,
                'mail_username' => $request->mail_username,
                'mail_password' => encrypt($cleanPassword), // Encrypt for storage
                'mail_encryption' => $request->mail_encryption,
                'mail_from_address' => $request->mail_from_address,
                'mail_from_name' => $request->mail_from_name,
            ];

            foreach ($settings as $key => $value) {
                $this->setSetting($key, $value);
            }

            // Test connection with the actual plain password
            $testSettings = $request->all();
            $testSettings['mail_password'] = $cleanPassword;
            
            try {
                $this->testEmailConnectionWithSettings($testSettings);
                Log::info('SMTP connection test successful');
            } catch (\Exception $e) {
                Log::error('SMTP connection test failed: ' . $e->getMessage());
                return response()->json([
                    'success' => false,
                    'message' => 'Paramètres sauvegardés mais erreur de connexion SMTP: ' . $e->getMessage()
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Paramètres email sauvegardés et testés avec succès.'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error updating email settings: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour des paramètres email.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function testEmail(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'test_email' => 'required|email'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Adresse email de test invalide',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get decrypted settings
            $settings = [
                'mail_host' => $this->getSetting('mail_host'),
                'mail_port' => $this->getSetting('mail_port'),
                'mail_username' => $this->getSetting('mail_username'),
                'mail_password' => $this->getDecryptedPassword(),
                'mail_encryption' => $this->getSetting('mail_encryption'),
                'mail_from_address' => $this->getSetting('mail_from_address'),
                'mail_from_name' => $this->getSetting('mail_from_name'),
            ];

            // Validate that we have all required settings
            if (!$settings['mail_host'] || !$settings['mail_password']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Configuration email incomplète. Veuillez d\'abord configurer tous les paramètres SMTP.'
                ], 400);
            }

            // Update mail configuration
            $this->updateMailConfig($settings);

            Log::info('Sending test email with config:', [
                'host' => $settings['mail_host'],
                'port' => $settings['mail_port'],
                'username' => $settings['mail_username'],
                'encryption' => $settings['mail_encryption'],
                'from_address' => $settings['mail_from_address'],
                'from_name' => $settings['mail_from_name'],
                'to' => $request->test_email
            ]);

            // Test SMTP connection first
            $this->testEmailConnectionWithSettings($settings);

            // Send test email
            Mail::raw('Ceci est un email de test depuis BizzWiz Admin. Si vous recevez ce message, votre configuration SMTP fonctionne correctement.', function ($message) use ($request, $settings) {
                $message->to($request->test_email)
                        ->subject('Test Email - BizzWiz - ' . now()->format('Y-m-d H:i:s'))
                        ->from($settings['mail_from_address'], $settings['mail_from_name']);
            });

            Log::info('Test email sent successfully to: ' . $request->test_email);

            return response()->json([
                'success' => true,
                'message' => 'Email de test envoyé avec succès à ' . $request->test_email . '. Vérifiez votre boîte de réception et dossier spam.'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Failed to send test email: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi de l\'email de test: ' . $e->getMessage()
            ], 500);
        }
    }

    private function getSetting($key, $default = null)
    {
        $setting = Setting::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    private function getDecryptedPassword()
    {
        $setting = Setting::where('key', 'mail_password')->first();
        if (!$setting) {
            return null;
        }

        try {
            return decrypt($setting->value);
        } catch (\Exception $e) {
            Log::error('Failed to decrypt mail password: ' . $e->getMessage());
            // If decryption fails, the password might not be encrypted
            return $setting->value;
        }
    }

    private function setSetting($key, $value)
    {
        Setting::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }

    private function updateMailConfig($settings)
    {
        Config::set('mail.default', 'smtp');
        Config::set('mail.mailers.smtp.transport', 'smtp');
        Config::set('mail.mailers.smtp.host', $settings['mail_host']);
        Config::set('mail.mailers.smtp.port', (int)$settings['mail_port']);
        Config::set('mail.mailers.smtp.username', $settings['mail_username']);
        Config::set('mail.mailers.smtp.password', $settings['mail_password']);
        Config::set('mail.mailers.smtp.encryption', $settings['mail_encryption']);
        Config::set('mail.from.address', $settings['mail_from_address']);
        Config::set('mail.from.name', $settings['mail_from_name']);

        // Additional Gmail-specific settings
        if (strpos($settings['mail_host'], 'gmail') !== false) {
            Config::set('mail.mailers.smtp.stream', [
                'ssl' => [
                    'allow_self_signed' => true,
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                ]
            ]);
        }
    }

    private function testEmailConnectionWithSettings($settings)
    {
        $host = $settings['mail_host'];
        $port = (int)$settings['mail_port'];
        $encryption = $settings['mail_encryption'];
        $username = $settings['mail_username'];
        $password = $settings['mail_password'];

        Log::info('Testing SMTP connection', [
            'host' => $host,
            'port' => $port,
            'username' => $username,
            'encryption' => $encryption
        ]);

        $useSSL = ($encryption === 'ssl');
        
        try {
            $transport = new EsmtpTransport($host, $port, $useSSL);
            $transport->setUsername($username);
            $transport->setPassword($password);

            // Start connection
            $transport->start();
            
            Log::info('SMTP connection established successfully');
            
            // Stop connection  
            $transport->stop();
            
        } catch (\Exception $e) {
            Log::error('SMTP connection failed', [
                'error' => $e->getMessage(),
                'host' => $host,
                'port' => $port,
                'username' => $username
            ]);
            throw new \Exception('SMTP Connection Failed: ' . $e->getMessage());
        }
    }
}