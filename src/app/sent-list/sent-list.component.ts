import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common'; 
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table'; 
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { Router, ActivatedRoute } from '@angular/router';
import { Email } from '../../interfaces/Email';
import { SidebarModule } from 'primeng/sidebar';
import { EmailDetailComponent } from "../detail-page/detail-page.component";

@Component({
  selector: 'app-sent-list',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    CommonModule, 
    TableModule, 
    SidebarModule, 
    CheckboxModule,
    TooltipModule,
    EmailDetailComponent
  ], 
  templateUrl: './sent-list.component.html',
  styleUrls: ['./sent-list.component.css']
})
export class SentListComponent implements OnChanges, OnInit {
  @Input() emailDataList: Email[] = [];
  @Input() searchTerm: string = '';
  searchValue: string = '';
  filteredEmailDataList: Email[] = [];
  selectedEmails: Email[] = [];
  detailPageVisible = false; 
  selectedEmail: Email | null = null; 

  showEmptyBodyEmails: boolean = false;
  columns = [
    { field: 'from', header: 'From' },
    { field: 'to', header: 'To' },
    { field: 'subject', header: 'Subject' },
    { field: 'body', header: 'Body' },
    { field: 'actions', header: 'Actions' }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService) {}

  ngOnInit(): void {
    this.emailDataList = this.emailDataList.map(email => ({
      ...email,
      body: email.body || '' 
    }));

    this.filteredEmailDataList = [...this.emailDataList]; 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['emailDataList']) {
      this.filteredEmailDataList = [...this.emailDataList]; 
      this.filterEmails();
    }
    if (changes['searchTerm']) {
      this.filterEmails();
    }
  }

  filterEmails() {
    const lowerSearchTerm = this.searchValue.toLowerCase();

    this.filteredEmailDataList = this.emailDataList.filter(email => {
      if (!email) {
        console.warn('Found undefined email:', email);
        return false;
      }

      const matchesSearch =
        (email.subject && email.subject.toLowerCase().includes(lowerSearchTerm)) ||
        (email.body && email.body.toLowerCase().includes(lowerSearchTerm)) ||
        (email.from && email.from.toLowerCase().includes(lowerSearchTerm)) ||
        (email.to && email.to.toLowerCase().includes(lowerSearchTerm));

      const matchesBodyFilter = this.showEmptyBodyEmails ? email.body !== '' : true;

      return matchesSearch && matchesBodyFilter;
    });
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  openDetailPage(email: Email) {
    this.detailPageVisible = true;
    this.selectedEmail = email; 
    this.router.navigate(['/email-detail'], {
      queryParams: { email: JSON.stringify(email) }
    });
  }

  closeDetailPage() {
    this.detailPageVisible = false;
    this.selectedEmail = null; 
    this.router.navigate(['/']); 
  }

  deleteEmail(email: Email) {
    this.emailDataList = this.emailDataList.filter(item => item.id !== email.id);
    this.filterEmails();  
    this.messageService.add({
      severity: 'success',
      summary: 'Delete',
      detail: `Success`,
      life: 1000
    });
  }

  deleteSelectedEmails() {
    this.selectedEmails.forEach(email => {
      this.emailDataList = this.emailDataList.filter(item => item.id !== email.id);
    });
    this.filterEmails();
    this.selectedEmails = []; 
    this.messageService.add({
      severity: 'success',
      summary: 'Delete',
      detail: `Success`,
      life: 1000
    });
  }
}