import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailComposeModalComponent } from './email-compose-modal/email-compose-modal.component';
import { SentListComponent } from './sent-list/sent-list.component';  
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Email } from '../interfaces/Email';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [
    SentListComponent,  
    EmailComposeModalComponent,
    CardModule,
    ToolbarModule,
    SidebarModule,
    NgClass,
    NgFor,
    NgIf,
    RouterModule,
    ToastModule
  ], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  emailDataList: Email[] = [
    {
      id: "id-1",
      from: 'guillermo.roman@upm.es',
      to: 'aerman.h@alumnos.upm.es',
      subject: 'Welcome and first lecture',
      body: 'First of all, welcome to the course Programming of User Interfaces. According to the schedule, the first lecture will take place on Thursday 12th September at 12:00 in classroom 6205.'
    },
    {
      id: "id-2",
      from: 'guillermo.roman@upm.es',
      to: 'aerman.h@alumnos.upm.es',
      subject: 'Some Angular/Typescript differences',
      body: 'It seems that there are small differences in the most recent versions of Typescript/Angular and there are some minor changes with respect to the code of the repository of examples:'
    },
    {
      id: "id-3",
      from: 'admision-noreply@upm.es',
      to: 'aerman.h@alumnos.upm.es',
      subject: 'Notificación de admisión en la UPM',
      body: 'Attached to this email you can find the official admission letter signed by the UPM.'
    },
    {
      id: "id-4",
      from: 'admision-noreply@upm.es',
      to: 'aerman.h@alumnos.upm.es',
      subject: 'No body email',
      body: ''
    },
  ];

  sidebarItems = [
    {
      label: 'Inbox',
      icon: 'fa-solid fa-envelope menu-icon',
      action: () => { },
      active: false
    },
    {
      label: 'Sent',
      icon: 'fa-regular fa-paper-plane menu-icon',
      action: () => { },
      active: true
    }
  ];

  constructor(private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(EmailComposeModalComponent);
    
    modalRef.componentInstance.emailSent.subscribe((email: Email) => {
      this.emailDataList = [...this.emailDataList, email];
    });
  }

  deleteEmail(emailId: string) {
    this.emailDataList = this.emailDataList.filter(email => email.id !== emailId);
  }
}