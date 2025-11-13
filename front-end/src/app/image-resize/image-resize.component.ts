import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';
import { environment } from '../../enviroments/enviroments'; // automatically swapped in prod

@Component({
  selector: 'app-image-resize',
  templateUrl: './image-resize.component.html',
  styleUrls: ['./image-resize.component.css'],
})
export class ImageResizeComponent {
  api_url = environment.apiUrl;
  url = '';
  uploadedFile: File | null = null;
  width?: number;
  height?: number;
  quality = 80;

  result: { message: string; filename: string; url: string } | null = null;
  loading = false;
  error = '';

  constructor(private api: ImageService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
      this.url = ''; // Clear URL if file is selected
    }
  }

  private detectFormatFromPath(p?: string): string | undefined {
    if (!p) return undefined;
    const clean = p.split('?')[0].split('#')[0];
    const m = clean.match(/\.([^.\/\\]+)$/);
    if (!m) return undefined;
    const ext = m[1].toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') return 'jpeg';
    if (ext === 'png') return 'png';
    if (ext === 'webp') return 'webp';
    return undefined;
  }

  resize() {
    this.error = '';
    this.result = null;

    if (!this.url && !this.uploadedFile) {
      this.error = 'Please provide an image URL or upload a file';
      return;
    }

    this.loading = true;

    const detectedFormat = this.uploadedFile
      ? this.detectFormatFromPath(this.uploadedFile.name)
      : this.detectFormatFromPath(this.url);

    if (this.uploadedFile) {
      // Upload and resize
      this.api
        .uploadAndResizeImage(
          this.uploadedFile,
          this.width,
          this.height,
          detectedFormat,
          this.quality
        )
        .subscribe({
          next: (res) => {
            this.result = res;
            this.loading = false;
            this.resetForm();
          },
          error: (err) => {
            this.error = 'Upload/resize failed';
            this.loading = false;
            console.error(err);
          },
        });
    } else {
      // Resize from URL
      this.api
        .resizeImage({
          url: this.url,
          w: this.width,
          h: this.height,
          fmt: detectedFormat,
          ql: this.quality,
        })
        .subscribe({
          next: (res) => {
            this.result = res;
            this.loading = false;
            this.resetForm();
          },
          error: (err) => {
            this.error = 'Resize failed';
            this.loading = false;
            console.error(err);
          },
        });
    }
  }

  resetForm() {
    this.url = '';
    this.uploadedFile = null;
    this.width = undefined;
    this.height = undefined;
    this.quality = 80;
  }
}
