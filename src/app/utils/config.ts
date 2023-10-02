import { Validators } from "@angular/forms";
import { ImgData } from "../types/user";

export const defaultMainPhoto = {
  publicId: "Foto principal",
  url: "http://res.cloudinary.com/dpx5dfzzv/image/upload/w_200,h_184/predeterminada",
  urlCard:
    "http://res.cloudinary.com/dpx5dfzzv/image/upload/w_200,h_184/predeterminada",
} as ImgData;

export const avatar = {
  format: "png",
  height: 512,
  publicId: "userUnknow",
  url: "http://res.cloudinary.com/dpx5dfzzv/image/upload/v1695823904/userUnknow.png",
  urlCard:
    "http://res.cloudinary.com/dpx5dfzzv/image/upload/w_300,h_181/userUnknow",
  width: 512,
};
export const starsInitial = [
  { position: 1, state: false },
  { position: 2, state: false },
  { position: 3, state: false },
  { position: 4, state: false },
  { position: 5, state: false },
];
export const menuOptions = [
  { path: "/home", label: "Explorar" },
  { path: "/trips/addtravel", label: "Añadir viaje" },
  { path: "/trips/alltrips", label: "Todos los viajes" },
  { path: "/about", label: "Acerca de" },
];

export const firstStepFormEmpty = {
  country: ["", []],
  city: ["", []],
  totalDays: ["", []],
  travellers: ["", []],
  budget: ["", []],
  mainPhoto: ["", []],
};

export const activitiesFormEmpty = {
  title: ["", [Validators.required]],
  description: ["", [Validators.required]],
  price: ["", [Validators.required]],
  photos: [""],
};
