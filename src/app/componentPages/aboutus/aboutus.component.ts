import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FuseCardComponent } from "@fuse/components/card/card.component";

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, MatIconModule, NgFor, MatExpansionModule, TranslocoModule, FuseCardComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  constructor(private translocoService: TranslocoService,){
  }
}
