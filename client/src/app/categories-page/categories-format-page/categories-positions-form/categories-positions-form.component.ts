import { Component, OnInit, Input } from "@angular/core"
import { PositionService } from 'src/app/shared/services/position.service'
import { Position } from 'src/app/shared/Interfaces'

@Component({
	selector: "app-categories-positions-form",
	templateUrl: "./categories-positions-form.component.html",
	styleUrls: ["./categories-positions-form.component.css"],
})
export class CategoriesPositionsFormComponent implements OnInit {
  @Input('categoryId') categoryId: string
  constructor(private positionService: PositionService) {}
  
  positions: Position[] = []
  loading = false

	ngOnInit(): void {
    this.loading = true
    this.positionService.fetch(this.categoryId).subscribe(
      positions => {
        this.positions = positions
        this.loading = false
      }
    )
  }
}
