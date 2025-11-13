import { Component, OnInit } from '@angular/core';
import { ImageService, ImageItem } from '../services/image.service';
import { environment } from '../../enviroments/enviroments'; // automatically swapped in prod

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css'],
})
export class ImagesListComponent implements OnInit {
  images: ImageItem[] = [];
  loading = false;
  error = '';
  api_uril = environment.apiUrl;
  constructor(private api: ImageService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.api.listImages().subscribe({
      next: (res) => {
        this.images = res.images || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load images';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
