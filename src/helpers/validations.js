/**
 * Static class for input validations
 * @since 29.06.2020
 */
/* eslint-disable-next-line */
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,30}$/;
/* eslint-disable-next-line */
const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

class Validations {
  /**
   * Function for validating an email
   * @param {*} email
   */
  static isValidEmail(email) {
    if (email.match(emailRegex)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Function for validating a password
   * @param {*} password
   */
  static isValidPassword(password) {
    if (password.match(passwordRegex)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Function for validating a phone number
   * @param {*} password
   */
  static isValidPhoneNumber(phoneNumber) {
    if (phoneNumber.match(phoneNumberRegex)) {
      return true;
    } else {
      return false;
    }
  }
}
export default Validations;
