import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from "@angular/core"
import { MaterialInterface, MaterialService } from '../shared/classes/material.service'

@Component({
	selector: "app-history-page",
	templateUrl: "./history-page.component.html",
	styleUrls: ["./history-page.component.css"],
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor() {}
  
  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterialInterface

  isFilterVisible = false

  ngOnInit(): void {}
  
  ngOnDestroy() {
    this.tooltip.destroy()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initToolTip(this.tooltipRef)
  }
}
