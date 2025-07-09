<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BizzWiz Email Verification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #1a1a40; /* BizzWiz deep space */
            padding: 20px;
            text-align: center;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content h1 {
            font-size: 24px;
            color: #1a1a40;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #ff007a; /* BizzWiz magenta flare */
            color: #ffffff;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #e6006e;
        }
        .footer {
            background-color: #f4f4f9;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #777777;
        }
        .footer a {
            color: #ff007a;
            text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
            .container {
                margin: 10px;
            }
            .content {
                padding: 20px;
            }
            .content h1 {
                font-size: 20px;
            }
            .content p {
                font-size: 14px;
            }
            .button {
                padding: 10px 20px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/a989574d-4ac8-453f-b942-2e53c4521d48/9397bc0a67103e2199f08da814eae151.png" alt="BizzWiz Logo">
        </div>
        <div class="content">
            <h1>Welcome to BizzWiz!</h1>
            <p>Thank you for registering with BizzWiz. To complete your registration and access your account, please verify your email address by clicking the button below.</p>
            <a href="{{ $actionUrl }}" class="button">Verify Your Email</a>
            <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
            {{-- <p><a href="{{ $actionUrl }}" style="color: #ff007a; word-break: break-all;">{{ $actionUrl }}</a></p> --}}
            <p>This verification link will expire in {{ config('auth.verification.expire', 60) }} minutes. If you did not create an account, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} BizzWiz. All rights reserved.</p>
            <p><a href="https://your-bizzwiz-url.com/contact">Contact Us</a> | <a href="https://your-bizzwiz-url.com/privacy">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>