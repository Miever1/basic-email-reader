import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailReaderFormComponent } from './email-reader-form/email-reader-form.component';
import { EmailComposeModalComponent } from './email-compose-modal/email-compose-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmailReaderFormComponent, EmailComposeModalComponent], // 不需要导入 NgbModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmailReader';
  constructor(private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(EmailComposeModalComponent);
    modalRef.result.then(
      (result) => {
        console.log(`Modal closed with: ${result}`); 
      },
      (reason) => {
        console.log(`Modal dismissed: ${reason}`); 
      }
    );
  }

  
}