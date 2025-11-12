import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageResizeComponent } from './image-resize/image-resize.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [AppComponent, ImagesListComponent, ImageResizeComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
