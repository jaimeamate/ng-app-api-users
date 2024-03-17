import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logoElement!: HTMLElement | null
  logoGitHub: string = './assets/images/logo/github-logo-48.png'
  logoProfile: string = 'https://avatars.githubusercontent.com/u/146433774?v=4'

  ngOnInit(): void {
    this.logoElement = document.getElementById('logoApp')
  }
  setProfileImage(): void {
    this.logoElement?.setAttribute('src',this.logoProfile)
  }
  setProfileImageToDefault(): void {
    this.logoElement?.setAttribute('src',this.logoGitHub)
  }
}
