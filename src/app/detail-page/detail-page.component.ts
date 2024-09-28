import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../../interfaces/Email'; // Import your Email interface

@Component({
  selector: 'app-email-detail',
  standalone: true,
  template: `
    <div class="email-detail">
      <h3>{{ email?.subject }}</h3>
      <p><strong>From:</strong> {{ email?.from }}</p>
      <p><strong>To:</strong> {{ email?.to }}</p>
      <p><strong>Body:</strong></p>
      <p>{{ email?.body }}</p>
      <button (click)="goBack()" class="btn btn-secondary">Go Back</button>
    </div>
  `,
  styleUrls: ['./detail-page.component.css']
})
export class EmailDetailComponent implements OnInit {
  email: Email | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = JSON.parse(params['email']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/your-desired-route']); 
  }
}