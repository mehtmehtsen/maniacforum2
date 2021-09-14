import { Component, OnInit } from '@angular/core';
import { BoardResponse } from './services/api/models';
import { ApiService } from './services/api/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  boards: Array<BoardResponse> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getBoards().subscribe((r) => {
      this.boards = r;
    });
  }

  loadBoard(id: number) {
    console.log('%c ', 'background: #222;', id);
    this.apiService.getThreads({ boardId: id }).subscribe((r) => {
      console.log(r);
    });
  }
}
