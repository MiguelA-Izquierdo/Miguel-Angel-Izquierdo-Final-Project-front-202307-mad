export type User = {
  id?: string;
  userName: string;
  password: string;
  email: string;
  firstName: string;
  avatar?: ImgData;
};

export type ImgData = {
  publicId: string;
  width: number;
  height: number;
  format: string;
  url: string;
  urlCard: string;
};

export type UserRegister = {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  imageData: File;
};
export type LoginData = {
  userName: string;
  password: string;
};

export type UserWithToken = User & {
  user: User;
  token: string;
};
