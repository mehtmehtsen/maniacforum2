import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/services';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  token: string | null = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.verify();
  }

  verify(): void {
    const rawToken = this.route.snapshot.paramMap.get('token');
    if (rawToken) this.token = decodeURIComponent(rawToken);
    else {
      console.error('No token found in URI');
      return;
    }
    this.apiService.verify({ token: this.token }).subscribe((r) => {
      if (r !== null) {
        console.error(r);
      }
    });
  }
}
