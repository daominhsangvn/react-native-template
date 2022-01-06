/* eslint-disable */
/**
 * LOGIN
 */
type LoginRequestModel = {
  email: string,
  password: string,
};

type LoginResponseModel = {
  accessToken: string,
  refreshToken: string,
  expiresIn: string,
};

/**
 * REGISTER
 */

type RegisterRequestModel = {
  email: string,
  password: string,
};

type RegisterResponseModel = {
  accessToken: string,
  refreshToken: string,
  expiresIn: string,
};

type CurrentUserResponseModel = {
  fullName: string,
  firstName: string,
  lastName: string,
  email: string,
  id: string,
};
