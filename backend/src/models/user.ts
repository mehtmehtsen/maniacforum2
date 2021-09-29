export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  showName: boolean;
  residence: string;
  homepage: string;
  firstGame: string;
  genres: string;
  systems: string;
  classics: string;
  hobbies: string;
  idXbox: string;
  idPs: string;
  idNintendo: string;
  image: string;
  createdAt: Date;
  modForBoards: number[];
}
