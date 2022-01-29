import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  @ViewChild('mail') mailInput!: ElementRef;
  @ViewChild('user') userInput!: ElementRef;
  @ViewChild('pass') passInput!: ElementRef;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  async handleSubmit(): Promise<void> {
    const email = (this.mailInput.nativeElement as HTMLInputElement).value;
    const username = (this.userInput.nativeElement as HTMLInputElement).value;
    const password = (this.passInput.nativeElement as HTMLInputElement).value;

    await this.apiService
      .signup({ email, username, password })
      .subscribe((r) => {
        console.log(r);
      });
  }
}
