import { Routes } from '@angular/router';
import { SentListComponent } from './sent-list/sent-list.component'; 
import { EmailDetailComponent } from './detail-page/detail-page.component'; 

export const routes: Routes = [
    { path: '', redirectTo: '/sent', pathMatch: 'full' },
    { path: 'sent', component: SentListComponent },
    { path: 'email-detail', component: EmailDetailComponent }, 
];