import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'humanDetectionFront';

  btnTest(): void {
    console.log('IT WORKSSS!');
  }
}
