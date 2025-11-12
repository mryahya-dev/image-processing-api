import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header class="header">
        <div class="brand">Image Resizer</div>
        <nav>
          <a routerLink="/gallery" routerLinkActive="active">Gallery</a>
          <a routerLink="/resize" routerLinkActive="active">Resize</a>
        </nav>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {}
