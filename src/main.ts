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
    dsn: "https://ba32432a34f34ba38e7ff98731f58b99@o485463.ingest.sentry.io/5655750",
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
