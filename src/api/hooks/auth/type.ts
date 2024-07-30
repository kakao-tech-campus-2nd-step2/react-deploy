export type UserRequestData = {
  email: string;
  password: string;
};

export type UserResponseData = {
  email: string;
  token: string;
};

export type AuthProps = UserRequestData;
