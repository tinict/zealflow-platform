import { genderMap } from "@/common/constants";

/**
 * Formats a phone number by removing all non-numeric characters except the plus sign, and replaces the country code +84 with 0.
 * This function is specifically designed for Vietnamese phone numbers but can be adapted for other formats.
 *
 * @param {string} phone - The phone number to be formatted.
 * @returns {string} - The formatted phone number with non-numeric characters removed and the country code +84 replaced with 0.
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return "N.A";
  let cleanPhone = phone.replace(/[^\d+]/g, "");

  cleanPhone = cleanPhone.replace(/^\+84/, "0");

  return cleanPhone;
};

/**
 *
 * @param gender
 * @returns
 */
export const formatGender = (gender: number): string => {
  if (gender == genderMap.Male) return "Male";
  if (gender == genderMap.Female) return "Female";

  return "Other";
};

/**
 *
 * @param date
 * @returns
 */
export const formatDate = (date: string): string => {
  if (!date) return "N.A";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

/**
 *
 * @param firstName
 * @param lastName
 * @returns
 */
export const formatFullName = (firstName: string, lastName: string): string => {
  if (firstName && lastName) return firstName.trim() + " " + lastName.trim();
  else if (!firstName && lastName) return lastName.trim();
  else if (firstName && !lastName) return firstName.trim();
  else return "N.A";
};

/**
 * Function to check if a string is a valid email.
 * @function
 * @param {string} email - The string email to check.
 * @returns {boolean} - True if the string is a valid email.
 */
export function validEmail(email: string = ""): boolean {
  const patternEmail =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return patternEmail.test(email);
}

/**
 * Validates a Vietnamese phone number, including those with country code prefix, switchboard numbers, and service/hotline numbers.
 *
 * @param phone The phone number to validate.
 * @returns true if the phone number is valid, false otherwise.
 */
export function validPhone(phone: string = ""): boolean {
  const cleanPhone = formatPhone(phone);
  const patternPhone =
    /^(?:(?:\+84)|0)(3|5|7|8|9|1[2|6|8|9])([0-9]{8})$|^(?:\+84|0)2([0-9]{9})$|^(?:\+84|0)?1900([0-9]{4,6})$/;

  return patternPhone.test(cleanPhone);
}
