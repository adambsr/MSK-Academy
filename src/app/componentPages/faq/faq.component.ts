import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, MatIconModule, NgFor, MatExpansionModule, TranslocoModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  constructor(private translocoService: TranslocoService) {
    
  }
}
