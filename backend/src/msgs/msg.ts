export interface Msg {
  boardId: number;
  id: number;
  userId: number;
  parentId: number;
  parentUserId: number;
  createdAt: string;
  subject: string;
  body: string;
  authorMod: boolean;
  path: string;
  username: string;
  parentUsername: string;
}
