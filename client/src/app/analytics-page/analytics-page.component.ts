import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core"
import { AnalyticsService } from '../shared/services/analytics.service'
import { AnalyticsPage } from '../shared/Interfaces'
import { Subscription } from 'rxjs'

@Component({
	selector: "app-analytics-page",
	templateUrl: "./analytics-page.component.html",
	styleUrls: ["./analytics-page.component.css"],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('revenue') revenueRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  aSub: Subscription
  average: number
  pending = true
  
	constructor(private analyticsService: AnalyticsService) {}

	ngAfterViewInit(): void {
    this.aSub = this.analyticsService.getAnalytics().subscribe(
      (res: AnalyticsPage) => {
        this.average = res.average

        this.pending = false
      }
    )
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}
