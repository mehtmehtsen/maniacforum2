export interface Msg {
  boardId: number;
  id: number;
  userId: number;
  parentId: number;
  parent_userId: number;
  timestamp: string;
  subject: string;
  body: string;
  authorMod: boolean;
  path: string;
}
