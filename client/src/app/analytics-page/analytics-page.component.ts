import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit,
	OnDestroy,
} from "@angular/core"
import { AnalyticsService } from "../shared/services/analytics.service"
import { AnalyticsPage } from "../shared/Interfaces"
import { Subscription } from "rxjs"
import { Chart } from "chart.js"

@Component({
	selector: "app-analytics-page",
	templateUrl: "./analytics-page.component.html",
	styleUrls: ["./analytics-page.component.css"],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
	@ViewChild("revenue") revenueRef: ElementRef
	@ViewChild("order") orderRef: ElementRef

	aSub: Subscription
	average: number
	pending = true

	constructor(private analyticsService: AnalyticsService) {}

	ngAfterViewInit(): void {
		const revenueConfig: any = {
			label: "Выручка",
			color: "rgb(255,99,132)",
    }
    
    const orderConfig: any = {
			label: "Заказы",
			color: "rgb(54,162,235)",
		}

		this.aSub = this.analyticsService
			.getAnalytics()
			.subscribe((res: AnalyticsPage) => {
				this.average = res.average
				revenueConfig.labels = res.chart.map((item) => item.label)
        revenueConfig.data = res.chart.map((item) => item.revenue)

        orderConfig.labels = res.chart.map((item) => item.label)
        orderConfig.data = res.chart.map((item) => item.order)
        
        const revenueContext =this.revenueRef.nativeElement.getContext('2d')
        const orderContext =this.orderRef.nativeElement.getContext('2d')

        revenueContext.canvas.height = '300px'
        orderContext.canvas.height = '300px'

        new Chart(revenueContext, createChartConfig(revenueConfig))
        new Chart(orderContext, createChartConfig(orderConfig))

				this.pending = false
			})
	}

	ngOnDestroy() {
		if (this.aSub) {
			this.aSub.unsubscribe()
		}
	}
}

function createChartConfig({ labels, data, label, color }) {
	return {
		type: "line",
		options: {
			responsive: true,
		},
		data: {
			labels,
			datasets: [
				{
					label,
					data,
					borderColor: color,
					steppedLine: false,
					fill: false,
				},
			],
		},
	}
}
