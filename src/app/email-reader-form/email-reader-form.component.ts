import { Component, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import types
import { Email } from "../../ interfaces/Email";
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-email-reader-form',
  standalone: true,
  imports: [NgClass,  NgIf, FormsModule, NgFor],
  templateUrl: './email-reader-form.component.html',
  styleUrl: './email-reader-form.component.css'
})

export class EmailReaderFormComponent {
  title = 'EmailReader';
  
  // emailData: Email;
  // emailDataList: Email[];
  // isSubmitd: boolean;
  inputStatus: any;

  constructor() {
    // this.emailData = {
    //   from: '',
    //   to: '',
    //   subject: '',
    //   body: ''
    // }
    // this.emailDataList = [
    //   {
    //     from: 'guillermo.roman@upm.es',
    //     to: 'aerman.h@alumnos.upm.es',
    //     subject: 'Welcome and first lecture',
    //     body: 'First of all, welcome to the course Programming of User Interfaces. According to the schedule, the first lecture will take place on Thursday 12th September at 12:00 in classroom 6205. '
    //   },
    //   {
    //     from: 'guillermo.roman@upm.es',
    //     to: 'aerman.h@alumnos.upm.es',
    //     subject: 'Some Angular/Typescript differences',
    //     body: '  It seems that there are small differences in the most recent versions of Typescript/Angular and there are some minor changes with respect to the code of the repository of examples:'
    //   },
    //   {
    //     from: 'admision-noreply@upm.es',
    //     to: 'aerman.h@alumnos.upm.es',
    //     subject: 'Notificación de admisión en la UPM',
    //     body: 'Attached to this email you can find the official admission letter signed by the UPM.'
    //   },
    // ];
    // this.isSubmitd = false;
  }

  
}
