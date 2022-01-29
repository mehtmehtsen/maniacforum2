import { Component, OnInit } from '@angular/core';
import { Board, Msg, Thread } from './../services/api/models';
import { ApiService } from './../services/api/services';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  boards: Array<Board> = [];
  threads: Array<Thread> = [];
  msgs: Array<Msg> = [];
  msg = <Msg>{};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getBoards().subscribe((r) => {
      this.boards = r;
    });
  }

  loadBoard(id: number) {
    this.apiService.getThreads({ boardId: id }).subscribe((r) => {
      this.threads = r;
    });
  }

  loadThread(id: number) {
    this.apiService.getMsgs({ threadId: id }).subscribe((r) => {
      this.msgs = r;
    });
  }

  loadMsg(id: number) {
    this.apiService.getMsg({ msgId: id }).subscribe((r) => {
      this.msg = r;
    });
  }
}
