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
import { FormGroup, FormControl, Validators } from "@angular/forms"

@Component({
	selector: "app-categories-positions-form",
	templateUrl: "./categories-positions-form.component.html",
	styleUrls: ["./categories-positions-form.component.css"],
})
export class CategoriesPositionsFormComponent
	implements OnInit, AfterViewInit, OnDestroy {
	@Input("categoryId") categoryId: string
	@ViewChild("modal") modalRef: ElementRef
	constructor(private positionService: PositionService) {}

	positions: Position[] = []
	loading = false
	positionId = null
	modal: MaterialInterface
	form: FormGroup

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(null, Validators.required),
			cost: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
		})

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
		this.positionId = position._id
		this.form.patchValue({
			name: position.name,
			cost: position.cost
		})
		this.modal.open()
		MaterialService.updateTextInputs()
	}

	onAddPosition() {
		this.positionId = null
		this.form.reset()
		this.modal.open()
		MaterialService.updateTextInputs()
	}

	onClose() {
		this.modal.close()
	}

	onDeletePosition(position: Position) {}

	onSubmit() {
		this.form.disable()

		const newPosition: Position = {
			name: this.form.value.name,
			cost: this.form.value.cost,
			category: this.categoryId,
		}

		const complete = () => {
			this.modal.close()
			this.form.reset({name: '', cost: null})
			this.form.enable()
		}

		if (this.positionId) {
			newPosition._id = this.positionId
			this.positionService.update(newPosition).subscribe(
				(position) => {
					const index = this.positions.findIndex(item => item._id === position._id)
					this.positions[index] = position
					MaterialService.toast("Позиция изменена")
				},
				(error) => {
					MaterialService.toast(error.error.message)
				},
				complete
			)
		} else {
			this.positionService.create(newPosition).subscribe(
				(position) => {
					MaterialService.toast("Позиция успешно создана")
					this.positions.push(position)
				},
				(error) => {
					MaterialService.toast(error.error.message)
				},
				complete
			)
		}

	}
}
