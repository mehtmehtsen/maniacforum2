export interface Thread {
  id: number;
  userId: number;
  parentId: number;
  parentUserId: number;
  timestamp: string;
  authorMod: boolean;
}

export interface Msg {
  threadId: number;
  id: number;
  userId: number;
  parentId: number;
  parent_userId: number;
  timestamp: string;
  title: string;
  body: string;
}
