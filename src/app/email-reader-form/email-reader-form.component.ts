import { Component, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import types
import { Email } from "../../ interfaces/Email";
import { NgClass,NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-email-reader-form',
  standalone: true,
  imports: [NgClass,  NgIf, FormsModule, NgFor],
  templateUrl: './email-reader-form.component.html',
  styleUrl: './email-reader-form.component.css'
})

export class EmailReaderFormComponent {
  title = 'EmailReader';
  
  emailData: Email;
  emailDataList: Email[];
  isSubmitd: boolean;
  inputStatus: any;

  constructor() {
    this.emailData = {
      from: '',
      to: '',
      subject: '',
      body: ''
    }
    this.emailDataList = [];
    this.isSubmitd = false;
  }

  onSubmit() {
    this.isSubmitd = true;
    window.alert(`The email ${this.emailData.subject} has been sent to ${this.emailData.to}`);
    this.emailDataList = [...this.emailDataList, { ...this.emailData}];
    this.onResetForm();
    console.log(this.emailDataList)
  }

  onResetForm() {
    this.emailData = {
      from: '',
      to: '',
      subject: '',
      body: ''
    }
  }

  onResetTable() {
    this.onResetForm();
    this.emailDataList = [];
  }
  
}
