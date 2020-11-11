import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  constructor(private translate: TranslateService) { }

  getDateTranslated(date: Date): String {

    const DayDiff = ((new Date(Date.now()).getTime() - new Date(date).getTime()) / 86400000)

    switch (true) {

      // recent
      case (DayDiff <= 1): {
        const minDiff = Math.abs((new Date(date).getTime() - new Date().getTime()) / 60000)
        // few secondes
        if (minDiff <= 1) return this.translate.instant('DATE.few-sec')
        // minutes ago
        if ((minDiff > 1) && (minDiff <= 50)) {
          return this.translate.instant('DATE.x-min-ago', { value: Math.round(minDiff) })
        }
        // hours ago
        if (minDiff > 50) {
          const hoursDiff = Math.abs((new Date(date).getTime() - new Date().getTime()) / 3600000)
          return this.translate.instant('DATE.x-hours-ago', { value: Math.round(hoursDiff) })
        }
      }

      // days ago
      case (DayDiff > 1 && DayDiff < 7): {
        return this.translate.instant('DATE.x-days-ago', { value: Math.round(DayDiff) })
      }

      // week ago
      case (DayDiff >= 7 && DayDiff < 30): {
        if (DayDiff) return this.translate.instant('DATE.a-week-ago')
        else {
          const countWeek = Math.round(DayDiff / 7)
          return this.translate.instant('DATE.x-week-ago', { value: countWeek })
        }
      }

      // month ago
      case (DayDiff >= 30 && DayDiff < 360): {
        const countMonth = Math.round(DayDiff / 30)
        if (countMonth <= 1) return this.translate.instant('DATE.a-month-ago')
        else return this.translate.instant('DATE.x-month-ago', { value: Math.round(countMonth) })
      }

      // years ago
      case (DayDiff >= 360): {
        if (DayDiff < 720) return this.translate.instant('DATE.a-years-ago')
        else return this.translate.instant('DATE.x-years-ago', { value: Math.round(DayDiff) })
      }

    }

  }

  getNotificationTranslatedForManyUser(lastUser: string, otherUsers: number) {
    return this.translate.instant('NOTIFICATIONS.profile1-&-others-users-liked-your-comment', { lastUser, otherUsers })
  }

  getErrorTranslatedCountryAlreadyOnTheDefaultArea(country: string) {
    return this.translate.instant('ADS.CREATION.Country-already-in-the-default-area', { country })
  }

  getAccountBalance(balance: number) {
    return this.translate.instant('SETTING.ledger.Yr-account-balance-is', { value: balance + ' $USD' })
  }

  getNumberOfDayBeforeTheNextRecharge(endDate: Date): string{
    const DayDiff = Math.round(( (new Date(endDate).getTime() - new Date(Date.now()).getTime()) / 86400000))
    return this.translate.instant('SETTING.ledger.Next-facturation-date', { value: DayDiff })
  }

}
