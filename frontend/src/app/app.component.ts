import { Component, OnInit } from '@angular/core';
import { BoardResponse } from './services/api/models';
import { ApiService } from './services/api/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'maniacforum2';
  boards: Array<BoardResponse> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getBoards().subscribe((r) => {
      this.boards = r;
    });
  }
}
