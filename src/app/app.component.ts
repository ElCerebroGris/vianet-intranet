import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intranet';
  online = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.showMenu.subscribe((mostrar) => (this.online = mostrar));
    if (this.auth.verifyUserLoged()) {
      this.online = true;
    }
  }
}
