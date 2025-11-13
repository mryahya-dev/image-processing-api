import { Component, ViewChild } from '@angular/core';
import { ImagesListComponent } from './images-list/images-list.component';

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
          <app-image-resize
            (imageResized)="onImageResized()"
          ></app-image-resize>
        </div>

        <!-- Gallery shown below -->
        <app-images-list #imagesList class="gallery"></app-images-list>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showResize = false;

  @ViewChild('imagesList') imagesList!: ImagesListComponent;

  onImageResized() {
    // Refresh the gallery when image is resized
    if (this.imagesList) {
      this.imagesList.loadImages();
    }
  }
}
