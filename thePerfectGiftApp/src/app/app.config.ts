import { ApplicationConfig, EnvironmentInjector, inject, provideAppInitializer, runInInjectionContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { getFunctions, provideFunctions } from '@angular/fire/functions'; 
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { UniversalTranslateLoader } from '../app/services/universaltranslateloader.service'
import { provideTranslateService, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';


// Factory function for TranslateHttpLoader
export function universalLoaderFactory(http: HttpClient) {
  return new UniversalTranslateLoader(http, 'assets/i18n/', '.json');
}

// Initialization function for TranslateService
export function initializeAppTranslation(envInjector: EnvironmentInjector) {
  return () =>
    runInInjectionContext(envInjector, () => {
      const translate = inject(TranslateService);

      console.log('Initializing TranslateService...');
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('fr');

      const result = translate.use('fr');

      return result;
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Simplified
    provideFirestore(() => getFirestore()),  // Directly call getFirestore()
    provideFunctions(() => getFunctions()),  // Directly call getFunctions()
    TranslateStore,
    provideHttpClient(),

    provideTranslateService({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: universalLoaderFactory,
        deps: [HttpClient],
      },
    }),

    provideAppInitializer(() => {
      const envInjector = inject(EnvironmentInjector);
      return initializeAppTranslation(envInjector)(); 
    }),
  ],
};
