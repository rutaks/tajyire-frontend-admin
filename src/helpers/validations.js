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

  /**
   * Function for validating a file to be a valid image
   * @param {*} file
   */
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

  /**
   * Function for validating a price range
   * @param {*} price the date to be validate
   * @param {*} minPrice the minimum allowed price
   * @param {*} maxPrice the maximum allowed price
   * @param {*} shouldValidate boolean to check if method should validate value
   * @return {string} error an error message that can be null
   */
  static validatePrice(price, minPrice, maxPrice, shouldValidate = true) {
    let error;

    if (shouldValidate) {
      try {
        price = parseInt(price);
        if (isNaN(price)) return 'Amount must be a number';
        if (price === minPrice) return `Amount can not be ${price}`;
        if (price < minPrice) return `Amount can not be less than ${minPrice}`;
        if (price > maxPrice) return `Amount can not be greater than ${maxPrice}`;
      } catch (error) {
        return 'Amount must be a number';
      }
    }
    return error;
  }

  /**
   * Function for validating a phone number
   * @param {*} date the date to be validate
   * @param {*} shouldValidate boolean to check if method should validate value
   * @return {string} error an error message that can be null
   */
  static validateCategoryId(id) {
    let error;
    try {
      id = parseInt(id);
      if (isNaN(id)) return 'Choose the proper sub category';
    } catch (err) {
      console.log(err);
      return 'Choose the proper category';
    }
    return error;
  }

  /**
   * Function for validating a phone number
   * @param {*} date the date to be validate
   * @param {*} shouldValidate boolean to check if method should validate value
   * @return {string} error an error message that can be null
   */
  static validateDeadline(date, shouldValidate = true) {
    let error;
    if (shouldValidate) {
      if (!(date instanceof Date)) return 'Date must be set';
      if (date < new Date()) return 'Date can not be before today';
    }
    return error;
  }
}
export default Validations;
