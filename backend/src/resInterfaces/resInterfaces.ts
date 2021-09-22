export interface ThreadRes {
  id: number;
  user_id: number;
  timestamp: string;
  subject: string;
}

export interface LastMsgRes {
  id: number;
  timestamp: string;
}

export interface UserRes {
  username: string;
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
