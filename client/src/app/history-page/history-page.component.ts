import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from "@angular/core"
import { MaterialInterface, MaterialService } from '../shared/classes/material.service'
import { OrdersService } from '../shared/services/orders.service'
import { Subscription } from 'rxjs'
import { Order } from '../shared/Interfaces'

const STEP = 2

@Component({
	selector: "app-history-page",
	templateUrl: "./history-page.component.html",
	styleUrls: ["./history-page.component.css"],
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private ordersService: OrdersService) {}
  
  @ViewChild('tooltip') tooltipRef: ElementRef
  oSub: Subscription
  tooltip: MaterialInterface
  isFilterVisible = false
  loading = false
  reloading = false
  isFullLoaded = false
  offset = 0
  limit = STEP
  orders: Order[] = []

  ngOnInit(): void {
    this.reloading = true
    this.fetch()
  }
  
  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    }
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders)
      this.isFullLoaded = orders.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  ngOnDestroy() {
    this.tooltip.destroy()
    this.oSub.unsubscribe()

  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initToolTip(this.tooltipRef)
  }

  loadMore() {
    this.loading = true
    this.offset += STEP
    this.fetch()
  }
}
