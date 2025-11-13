import { Component, OnInit } from '@angular/core';
import { ImageService, ImageItem } from '../services/image.service';
import { environment } from '../../enviroments/enviroments';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css'],
})
export class ImagesListComponent implements OnInit {
  images: any[] = [];
  loading = false;
  error = '';
  api_url = environment.apiUrl;

  selectedImage: any = null;
  showModal = false;

  constructor(private api: ImageService) {}

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    this.loading = true;
    this.api.listImages().subscribe({
      next: (res) => {
        this.images = res.images;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load images';
        this.loading = false;
        console.error(err);
      },
    });
  }

  openImage(image: any) {
    this.selectedImage = image;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }

  downloadImage(image: any) {
    const downloadUrl = `${this.api_url}/download/${image.filename}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = image.filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
