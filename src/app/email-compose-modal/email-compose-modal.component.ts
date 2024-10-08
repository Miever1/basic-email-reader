import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Email } from "../../interfaces/Email";
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-email-compose-modal',
  standalone: true,
  imports: [FormsModule, NgClass, NgFor, NgIf],
  templateUrl: './email-compose-modal.component.html',
  styleUrls: ['./email-compose-modal.component.css']
})
export class EmailComposeModalComponent {
  emailData: Email;
  isSubmitd: boolean = false;
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  subjectPattern: string = '^.{10,50}$';
  @Output() emailSent = new EventEmitter<Email>();

  constructor(public activeModal: NgbActiveModal, private messageService: MessageService) {
    this.emailData = {
      id: `id-${Date.now()}`,
      from: '',
      to: '',
      subject: '',
      body: ''
    };
  }

  onSubmit() {
    this.isSubmitd = true;
    if (this.emailData.from && this.emailData.to && this.emailData.subject) {
      console.log(this.emailSent);
      this.emailSent.emit(this.emailData);
      this.showToast(); 
      this.onClose();
    }
  }

  onClose() {
    this.activeModal.dismiss(); 
  }

  showToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Email Sent',
      detail: `The email "${this.emailData.subject}" has been sent to ${this.emailData.to}`,
      life: 3000
    });
  }
}