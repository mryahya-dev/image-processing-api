// ...existing code...
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header class="header">
        <div class="brand">Image Resizer</div>
        <button class="resize-btn" (click)="showResize = !showResize">
          {{ showResize ? 'Close Resize' : 'Resize Image' }}
        </button>
      </header>

      <main class="main-content">
        <!-- Resize form panel on top -->
        <div class="resize-panel" *ngIf="showResize">
          <app-image-resize></app-image-resize>
        </div>

        <!-- Gallery shown below -->
        <app-images-list class="gallery"></app-images-list>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showResize = false;
}
// ...existing code...
