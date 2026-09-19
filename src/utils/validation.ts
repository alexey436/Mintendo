/**
 * Validation and mask utilities for lead generation forms.
 * Formats Ukrainian phone numbers strictly as: +380 (44) 123-12-31
 * and validates Telegram usernames.
 */

export interface ValidationResult {
  isValid: boolean;
  type: 'phone' | 'telegram' | 'unknown';
  formatted: string;
  error?: string;
}

/**
 * Validates user's name (must contain only letters)
 */
export function validateName(name: string): { isValid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: "Будь ласка, вкажіть ваше ім'я" };
  }

  // Check if there are any digits
  if (/\d/.test(trimmed)) {
    return { isValid: false, error: "Ім'я має складатися тільки з букв (без цифр)" };
  }

  // Check for allowed characters: only Ukrainian/Latin letters, spaces, hyphens, apostrophes
  if (!/^[a-zA-Zа-яА-ЯіїєґІЇЄҐ\s'’ʼ-]+$/.test(trimmed)) {
    return { isValid: false, error: "Ім'я може містити лише літери (без спецсимволів)" };
  }

  // Must contain at least 2 letters
  const lettersOnly = trimmed.replace(/[^a-zA-Zа-яА-ЯіїєґІЇЄҐ]/g, '');
  if (lettersOnly.length < 2) {
    return { isValid: false, error: "Ім'я має містити щонайменше 2 літери" };
  }

  if (trimmed.length > 50) {
    return { isValid: false, error: "Ім'я занадто довге (максимум 50 символів)" };
  }

  return { isValid: true };
}

/**
 * Sanitizes name input live as user types - strips out all digits and illegal symbols,
 * allowing only letters, spaces, hyphens and apostrophes.
 */
export function sanitizeNameInput(raw: string): string {
  return raw.replace(/[^a-zA-Zа-яА-ЯіїєґІЇЄҐ\s'’ʼ-]/g, '');
}

/**
 * Extracts the 9 national subscriber digits (code + number) for Ukraine.
 * Handles inputs like "+380441231231", "0441231231", "441231231", "80441231231".
 */
export function extractUkrainianSubscriberDigits(input: string): string {
  let digits = input.replace(/\D/g, '');

  if (digits.startsWith('380')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('80')) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  return digits.slice(0, 9);
}

/**
 * Formats input strictly into: +380 (XX) XXX-XX-XX
 * Example:
 * 441231231 -> +380 (44) 123-12-31
 */
export function formatUkrainianPhoneMask(input: string): string {
  const subDigits = extractUkrainianSubscriberDigits(input);

  if (subDigits.length === 0) {
    return '+380 ';
  }

  let formatted = '+380 ';

  // (XX)
  if (subDigits.length <= 2) {
    formatted += `(${subDigits}`;
  } else {
    formatted += `(${subDigits.slice(0, 2)}) `;

    // XXX
    if (subDigits.length <= 5) {
      formatted += subDigits.slice(2);
    } else {
      formatted += `${subDigits.slice(2, 5)}-`;

      // XX
      if (subDigits.length <= 7) {
        formatted += subDigits.slice(5);
      } else {
        formatted += `${subDigits.slice(5, 7)}-${subDigits.slice(7, 9)}`;
      }
    }
  }

  return formatted;
}

/**
 * Live sanitizer and mask for contact input.
 * When channel is phone/whatsapp: applies "+380 (XX) XXX-XX-XX" mask.
 * When channel is telegram: allows @ and telegram handle, or phone if starting with +/digits.
 */
export function sanitizeContactInput(raw: string, preferredChannel?: string): string {
  if (preferredChannel === 'phone' || preferredChannel === 'whatsapp') {
    // If user explicitly clears back to empty or a single backspace
    if (!raw || raw.trim() === '+' || raw.trim() === '+3' || raw.trim() === '+38' || raw.trim() === '') {
      return '';
    }
    return formatUkrainianPhoneMask(raw);
  }

  if (preferredChannel === 'telegram') {
    // If user typed phone number starting with + or digits without @
    const trimmed = raw.trim();
    if (trimmed.startsWith('+') || /^\d/.test(trimmed)) {
      if (trimmed.length > 3) {
        return formatUkrainianPhoneMask(raw);
      }
      return raw.replace(/[^\d+\s\-()]/g, '');
    }
    // Telegram handle: allow @, latin letters, numbers, underscore
    return raw.replace(/[^\w@_]/g, '');
  }

  // Default: if digits, format as phone mask, else keep
  if (raw.startsWith('+') || /^\d/.test(raw.trim())) {
    return formatUkrainianPhoneMask(raw);
  }

  return raw.replace(/[^\w@_+\-.\s/:]/g, '');
}

/**
 * Detects whether contact string is intended as Telegram or Phone
 */
export function detectContactType(raw: string, preferredChannel?: string): 'phone' | 'telegram' {
  const trimmed = raw.trim();
  if (preferredChannel === 'phone' || preferredChannel === 'whatsapp') {
    return 'phone';
  }
  if (preferredChannel === 'telegram') {
    if (trimmed.startsWith('@') || /[a-zA-Z]/.test(trimmed)) {
      return 'telegram';
    }
    return 'phone';
  }
  if (trimmed.startsWith('@') || /t\.me\//i.test(trimmed) || /[a-zA-Z]/.test(trimmed)) {
    return 'telegram';
  }
  return 'phone';
}

/**
 * Validates and formats contact info (Phone strictly +380 (XX) XXX-XX-XX or Telegram)
 */
export function validateContact(raw: string, preferredChannel?: string): ValidationResult {
  const trimmed = raw.trim();

  if (!trimmed || trimmed === '+380' || trimmed === '+380 ') {
    return {
      isValid: false,
      type: preferredChannel === 'telegram' ? 'telegram' : 'phone',
      formatted: '',
      error: preferredChannel === 'telegram'
        ? 'Вкажіть Telegram нікнейм або номер телефону'
        : 'Введіть номер телефону',
    };
  }

  const type = detectContactType(trimmed, preferredChannel);

  // 1. TELEGRAM VALIDATION
  if (type === 'telegram') {
    const cleanNick = trimmed
      .replace(/^(?:https?:\/\/)?(?:www\.)?t\.me\//i, '')
      .replace(/^@+/, '')
      .trim();

    if (!cleanNick) {
      return {
        isValid: false,
        type: 'telegram',
        formatted: '',
        error: 'Вкажіть нікнейм у Telegram (наприклад, @username)',
      };
    }

    if (/[а-яА-ЯіїєґІЇЄҐёЁ]/.test(cleanNick)) {
      return {
        isValid: false,
        type: 'telegram',
        formatted: `@${cleanNick}`,
        error: 'Нікнейм Telegram має бути латиницею (наприклад, @alex_dev)',
      };
    }

    if (/\s/.test(cleanNick)) {
      return {
        isValid: false,
        type: 'telegram',
        formatted: `@${cleanNick}`,
        error: 'Нікнейм Telegram не може містити пробіли',
      };
    }

    if (!/^[a-zA-Z0-9_]+$/.test(cleanNick)) {
      return {
        isValid: false,
        type: 'telegram',
        formatted: `@${cleanNick}`,
        error: 'Нікнейм Telegram може містити лише латинські літери (a-z), цифри та _',
      };
    }

    if (cleanNick.length < 5) {
      return {
        isValid: false,
        type: 'telegram',
        formatted: `@${cleanNick}`,
        error: `Нікнейм занадто короткий: ${cleanNick.length} із 5 необхідних символів`,
      };
    }

    if (cleanNick.length > 32) {
      return {
        isValid: false,
        type: 'telegram',
        formatted: `@${cleanNick}`,
        error: 'Нікнейм занадто довгий: максимум 32 символи',
      };
    }

    return {
      isValid: true,
      type: 'telegram',
      formatted: `@${cleanNick}`,
    };
  }

  // 2. PHONE VALIDATION (Strict format: +380 (XX) XXX-XX-XX)
  if (/[a-zA-Zа-яА-ЯіїєґІЇЄҐёЁ]/.test(trimmed)) {
    return {
      isValid: false,
      type: 'phone',
      formatted: trimmed,
      error: 'Номер телефону має містити лише цифри',
    };
  }

  const subDigits = extractUkrainianSubscriberDigits(trimmed);

  if (subDigits.length === 0) {
    return {
      isValid: false,
      type: 'phone',
      formatted: '+380 ',
      error: 'Введіть номер телефону після +380',
    };
  }

  // Need exactly 9 digits after 380: 2 (code) + 7 (number)
  if (subDigits.length < 9) {
    return {
      isValid: false,
      type: 'phone',
      formatted: formatUkrainianPhoneMask(trimmed),
      error: `Не вистачає цифр: введено ${subDigits.length} з 9 (наприклад: +380 (44) 123-12-31)`,
    };
  }

  // Exact 9 digits formatted as requested: +380 (44) 123-12-31
  const code = subDigits.slice(0, 2);
  const p1 = subDigits.slice(2, 5);
  const p2 = subDigits.slice(5, 7);
  const p3 = subDigits.slice(7, 9);
  const formatted = `+380 (${code}) ${p1}-${p2}-${p3}`;

  return {
    isValid: true,
    type: 'phone',
    formatted,
  };
}
