import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'maniacforum2';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getBoards().subscribe((r) => {
      console.log(r);
    });
  }
}
