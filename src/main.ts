import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import 'hammerjs'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import * as Sentry from '@sentry/angular'
import { Integrations } from '@sentry/tracing'


if (environment.production) {
  enableProdMode()

  Sentry.init({
    dsn: "https://8c1255d675444f9e8ba8bfaf4597d1b9@o833200.ingest.sentry.io/5812918",
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ['localhost', 'https://www.wiins.io'],
        routingInstrumentation: Sentry.routingInstrumentation,
      })
    ],
    tracesSampleRate: 1.0
  })
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))
