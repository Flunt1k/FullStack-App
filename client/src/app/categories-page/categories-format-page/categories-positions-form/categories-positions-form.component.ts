import {
	Component,
	OnInit,
	Input,
	ViewChild,
	ElementRef,
	AfterViewInit,
  OnDestroy,
} from "@angular/core"
import { PositionService } from "src/app/shared/services/position.service"
import { Position } from "src/app/shared/Interfaces"
import {
	MaterialService,
	MaterialInterface,
} from "src/app/shared/classes/material.service"

@Component({
	selector: "app-categories-positions-form",
	templateUrl: "./categories-positions-form.component.html",
	styleUrls: ["./categories-positions-form.component.css"],
})
export class CategoriesPositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input("categoryId") categoryId: string
	@ViewChild("modal") modalRef: ElementRef
	constructor(private positionService: PositionService) {}

	positions: Position[] = []
	loading = false
	modal: MaterialInterface

	ngOnInit(): void {
		this.loading = true
		this.positionService.fetch(this.categoryId).subscribe((positions) => {
			this.positions = positions
			this.loading = false
		})
	}

	ngAfterViewInit() {
		this.modal = MaterialService.initModal(this.modalRef)
  }
  
  ngOnDestroy() {
    this.modal.destroy()
  }

  onSelectPosition(position: Position) {
    this.modal.open()
  }

  onAddPosition() {
    this.modal.open()
  }

  onClose() {
    this.modal.close()
  }
}
