import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TableModule } from 'primeng/table'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Email } from '../../interfaces/Email';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sent-list',
  standalone: true,
  imports: [CommonModule, TableModule, SidebarModule], 
  templateUrl: './sent-list.component.html',
  styleUrls: ['./sent-list.component.css']
})
export class SentListComponent implements OnChanges, OnInit {
  @Input() emailDataList: Email[] = [];
  @Input() searchTerm: string = '';
  filteredEmailDataList: Email[] = [];
  
  detailPageVisible = false; // Controls the visibility of the sidebar
  selectedEmail: Email | null = null; // To hold the selected email

  columns = [
    { field: 'from', header: 'From' },
    { field: 'to', header: 'To' },
    { field: 'subject', header: 'Subject' },
    { field: 'body', header: 'Body' },
    { field: 'actions', header: 'Actions' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.filteredEmailDataList = [...this.emailDataList]; 
  }

  ngOnInit(): void {
    // Check if the URL has an email parameter on initialization
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.selectedEmail = JSON.parse(params['email']); // Parse the email data
        this.detailPageVisible = true; // Show the sidebar
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['emailDataList']) {
      this.filteredEmailDataList = [...this.emailDataList]; 
    }
    if (changes['searchTerm']) {
      this.filterEmails();
    }
  }

  filterEmails() {
    if (!this.searchTerm) {
      this.filteredEmailDataList = [...this.emailDataList];
    } else {
      this.filteredEmailDataList = this.emailDataList.filter(email =>
        email.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        email.body?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  openDetailPage(email: Email) {
    this.detailPageVisible = true;
    this.selectedEmail = email; // Set the selected email for the sidebar
    this.router.navigate(['/email-detail'], {
      queryParams: { email: JSON.stringify(email) } // Pass the email data as a query parameter
    });
  }

  closeDetailPage() {
    this.detailPageVisible = false;
    this.selectedEmail = null; // Reset selected email
    this.router.navigate(['/']); // Navigate to the home page
  }

  deleteEmail(email: Email) {
    this.emailDataList = this.emailDataList.filter(item => item.id !== email.id);
    this.filterEmails();  
  }
}