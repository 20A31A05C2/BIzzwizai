import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Checks if a JWT token is expired
export function isJwtExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return false; // If no exp, treat as not expired
    // exp is in seconds since epoch
    return Date.now() >= payload.exp * 1000;
  } catch (e) {
    return true; // If token is malformed, treat as expired
  }
}