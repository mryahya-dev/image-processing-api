import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-resize',
  templateUrl: './image-resize.component.html',
  styleUrls: ['./image-resize.component.css'],
})
export class ImageResizeComponent {
  url = '';
  width?: number;
  height?: number;
  format = 'jpeg';
  quality = 80;

  result: { message: string; filename: string; url: string } | null = null;
  loading = false;
  error = '';

  constructor(private api: ImageService) {}

  resize() {
    this.error = '';
    this.result = null;
    if (!this.url) {
      this.error = 'Image URL is required';
      return;
    }
    this.loading = true;

    this.api
      .resizeImage({
        url: this.url,
        w: this.width,
        h: this.height,
        fmt: this.format,
        ql: this.quality,
      })
      .subscribe({
        next: (res) => {
          this.result = res;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Resize failed';
          this.loading = false;
          console.error(err);
        },
      });
  }
}
