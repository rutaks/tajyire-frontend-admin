/**
 * A function used check if user is logged in through checking if token exists
 * @since 29.06.2020
 */
export default () => {
  try {
    const isAuth = !!localStorage.TAJYIRE_TOKEN;
    return isAuth;
  } catch (error) {
    return false;
  }
};
