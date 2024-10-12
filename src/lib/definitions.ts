import { PLATFORM } from "./coreconstants";

export type UserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export type UserLink = {
  platform: PLATFORM;
  url: string;
};
