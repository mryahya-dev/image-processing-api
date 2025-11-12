import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ImageItem {
  filename: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class ImageService {
  constructor(private http: HttpClient) {}

  listImages(): Observable<{ images: ImageItem[] }> {
    return this.http.get<{ images: ImageItem[] }>('/images');
  }

  resizeImage(params: {
    url: string;
    w?: number;
    h?: number;
    fmt?: string;
    ql?: number;
  }) {
    let httpParams = new HttpParams().set('url', params.url);
    if (params.w) httpParams = httpParams.set('w', String(params.w));
    if (params.h) httpParams = httpParams.set('h', String(params.h));
    if (params.fmt) httpParams = httpParams.set('fmt', params.fmt);
    if (params.ql) httpParams = httpParams.set('ql', String(params.ql));

    return this.http.get<{ message: string; filename: string; url: string }>(
      '/resize',
      { params: httpParams }
    );
  }
}
