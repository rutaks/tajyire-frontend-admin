import axiosHelper from '../helpers/axiosHelper';

/**
 * An axios middleware used to make API calls based on params passed from the `apiAction`.
 * Will dispatch states based on state {start,end,success,fail} passed respectively
 * @since 06.05.2020
 */
const asyncApi = async (payload = {}) => {
  try {
    const { data } = await axiosHelper({})[payload.method](payload.url);
    return data;
  } catch (error) {
    const err = error.response ? error.response.data.message : error.message;
    console.error(err);
    throw error;
  }
};

export default asyncApi;
