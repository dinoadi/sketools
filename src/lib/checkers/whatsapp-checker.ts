import axios from 'axios';

// Pitucode API configuration
const PITUCODE_API_KEY = process.env.PITUCODE_API_KEY || '7C0dEc80d39';
const PITUCODE_WHATSAPP_CHECKER_URL = 'https://api.pitucode.com/whatsapp-checker-stalker';

export interface WhatsAppCheckResult {
  number: string;
  exists: boolean;
  status?: string;
  profilePicture?: string;
  about?: string;
  lastSeen?: string;
  name?: string;
  error?: string;
}

/**
 * Check if a WhatsApp number exists and get profile information
 */
export async function checkWhatsAppNumber(number: string): Promise<WhatsAppCheckResult> {
  try {
    // Clean the number - remove spaces, dashes, and other non-digit characters
    const cleanNumber = number.replace(/[^0-9+]/g, '');
    
    if (!cleanNumber || cleanNumber.length < 10) {
      throw new Error('Invalid WhatsApp number. Please enter a valid phone number.');
    }

    // Call Pitucode WhatsApp Checker API
    const response = await axios.get(PITUCODE_WHATSAPP_CHECKER_URL, {
      params: {
        number: cleanNumber,
      },
      headers: {
        'x-api-key': PITUCODE_API_KEY,
      },
      timeout: 30000,
    });

    const data = response.data;

    // Parse API response
    if (!data) {
      throw new Error('Failed to check WhatsApp number');
    }

    // Check if the number exists
    const exists = data.exists !== undefined ? data.exists : data.status === 'success';
    
    return {
      number: cleanNumber,
      exists,
      status: data.status,
      profilePicture: data.profilePicture || data.profile_picture || data.pp || '',
      about: data.about || data.bio || '',
      lastSeen: data.lastSeen || data.last_seen || '',
      name: data.name || data.display_name || '',
      error: data.error,
    };
  } catch (error: any) {
    console.error('Error checking WhatsApp number:', error.message);
    
    if (error.response?.data?.message) {
      throw new Error(`API Error: ${error.response.data.message}`);
    }
    
    throw new Error(`Failed to check WhatsApp number: ${error.message}`);
  }
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(number: string): string {
  const cleanNumber = number.replace(/[^0-9+]/g, '');
  
  if (cleanNumber.startsWith('+')) {
    return cleanNumber;
  }
  
  // Add country code if not present (assuming Indonesia by default)
  if (cleanNumber.length === 12 && cleanNumber.startsWith('62')) {
    return `+${cleanNumber}`;
  }
  
  if (cleanNumber.length === 11 && cleanNumber.startsWith('0')) {
    return `+62${cleanNumber.substring(1)}`;
  }
  
  return `+${cleanNumber}`;
}

/**
 * Validate WhatsApp number format
 */
export function validateWhatsAppNumber(number: string): { valid: boolean; message?: string } {
  const cleanNumber = number.replace(/[^0-9+]/g, '');
  
  if (!cleanNumber) {
    return { valid: false, message: 'Please enter a phone number' };
  }
  
  if (cleanNumber.length < 10) {
    return { valid: false, message: 'Phone number is too short' };
  }
  
  if (cleanNumber.length > 15) {
    return { valid: false, message: 'Phone number is too long' };
  }
  
  return { valid: true };
}
