import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailReaderFormComponent  } from './email-reader-form/email-reader-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmailReaderFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmailReader';
}
