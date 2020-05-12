import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	OnDestroy,
	AfterViewInit,
} from "@angular/core"
import { AnalyticsService } from "../shared/services/analytics.service"
import { Observable } from "rxjs"
import { OverviewPage } from "../shared/Interfaces"
import {
	MaterialInterface,
	MaterialService,
} from "../shared/classes/material.service"

@Component({
	selector: "app-overview-page",
	templateUrl: "./overview-page.component.html",
	styleUrls: ["./overview-page.component.css"],
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
	constructor(private overviewService: AnalyticsService) {}

	@ViewChild("tapTarget") tapTargetRef: ElementRef
	data$: Observable<OverviewPage>
	tapTarget: MaterialInterface
	yesterday: Date = new Date()

	ngOnInit(): void {
		this.data$ = this.overviewService.getOverview()
		this.yesterday.setDate(this.yesterday.getDate() - 1)
	}

	ngOnDestroy() {
		this.tapTarget.destroy()
	}

	ngAfterViewInit() {
		this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
	}

	showInfo() {
		this.tapTarget.open()
	}
}
