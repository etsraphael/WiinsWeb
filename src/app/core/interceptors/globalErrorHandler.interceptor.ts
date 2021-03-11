import { ErrorHandler, Injectable} from '@angular/core'
import * as Sentry from '@sentry/browser';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error: any) {
    Sentry.captureException(error)
    throw error
  }
}