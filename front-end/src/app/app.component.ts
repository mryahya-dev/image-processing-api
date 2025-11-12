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
        <!-- Gallery component always visible -->
        <app-images-list class="gallery"></app-images-list>

        <!-- Resize form component as a side panel / call-to-action -->
        <div class="resize-panel" *ngIf="showResize">
          <app-image-resize></app-image-resize>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showResize = false;
}
