import { customAlphabet } from 'nanoid';

export function generateUserId() {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nanoid = customAlphabet(characters, 16);
  const userId = nanoid();
  return userId;
}

export function generateCircleCode() {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nanoid = customAlphabet(alphabet, 6);
  const sixDigitCode = nanoid();
  return sixDigitCode;
}
