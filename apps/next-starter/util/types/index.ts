export type UserSession = {
  user: {
    id: string;
    name?: string;
    image?: string;
  } & { [key: string]: string };
};
