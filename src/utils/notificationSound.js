// Notification sound utility
class NotificationSound {
  constructor() {
    this.audio = null;
    this.isEnabled = true;
    this.init();
  }

  init() {
    try {
      // Create a simple notification sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      this.audio = { context: audioContext, oscillator, gainNode };
    } catch (error) {
      console.warn('Could not initialize notification sound:', error);
    }
  }

  play() {
    if (!this.isEnabled || !this.audio) return;

    try {
      const { context, oscillator, gainNode } = this.audio;
      
      // Resume context if suspended
      if (context.state === 'suspended') {
        context.resume();
      }

      // Reset and play
      oscillator.frequency.setValueAtTime(800, context.currentTime);
      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.5);
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }
}

// Create singleton instance
const notificationSound = new NotificationSound();

export default notificationSound; 