import { message } from 'antd';
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

  static isValidImage(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
}
export default Validations;
