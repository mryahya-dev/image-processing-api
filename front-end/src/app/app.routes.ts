import { Routes } from '@angular/router';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageResizeComponent } from './image-resize/image-resize.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  { path: 'gallery', component: ImagesListComponent },
  { path: 'resize', component: ImageResizeComponent },
  { path: '**', redirectTo: 'gallery' },
];
