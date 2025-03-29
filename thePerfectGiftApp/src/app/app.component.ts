import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'The Perfect Gift';
  isLoaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

    this.translate.use('fr').subscribe(() => {
      this.isLoaded = true;
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite(); // Runs only in the browser
    }
  }
}
