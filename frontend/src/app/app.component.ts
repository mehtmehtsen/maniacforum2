import { Component, OnInit } from '@angular/core';
import { Board, Thread } from './services/api/models';
import { ApiService } from './services/api/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  boards: Array<Board> = [];
  threads: Array<Thread> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    console.log('%c getting boards', 'background: #222;');
    this.apiService.getBoards().subscribe((r) => {
      console.log('%c theres boards', 'background: #222;', r);
      this.boards = r;
    });
  }

  loadBoard(id: number) {
    this.apiService.getThreads({ boardId: id }).subscribe((r) => {
      this.threads = r;
    });
  }

  loadThread(id: number) {
    console.log(id);
  }
}
