export interface Thread {
  boardId: number;
  id: number;
  userId: number;
  parentId: number;
  parentUserId: number;
  timestamp: string;
  subject: string;
  body: string;
}
