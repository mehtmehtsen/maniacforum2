export interface Msg {
  boardId: number;
  id: number;
  userId: number;
  parentId: number;
  parentUserId: number;
  timestamp: string;
  subject: string;
  body: string;
  authorMod: boolean;
  path: string;
  username: string;
  parentUsername: string;
}

export interface MsgRes {
  board_id: number;
  id: number;
  user_id: number;
  parent_id: number;
  parent_user_id: number;
  timestamp: string;
  subject: string;
  body: string;
  author_mod: boolean;
  path: string;
}
