export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
