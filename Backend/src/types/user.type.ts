export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  role?: string;
  id?: number;
  money: number
}

export interface IUserLogin {
  email: string;
  password: string;
  role?: string;
}
