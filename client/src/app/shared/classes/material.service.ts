import { ElementRef } from '@angular/core'

declare var M

export interface MaterialInterface {
    open?(): void
    close?(): void
    destroy?(): void
}

export class MaterialService {
    static toast(message: string) {
        M.toast({html: message})
    }

    static initializeFloatingBtn(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement)
    }

    static updateTextInputs() {
        M.updateTextFields()
    }

    static initModal(ref: ElementRef) {
        return M.Modal.init(ref.nativeElement)
    }

    static initToolTip(ref: ElementRef){
        return M.Tooltip.init(ref.nativeElement)
    }

    static initDatePicker(ref: ElementRef, onClose: () => void) {
        return M.Datepicker.init(ref.nativeElement, {
            format: 'dd.mm.yyyy',
            showClearBtn: true,
            onClose
        })
    }

    static initTapTarget(ref: ElementRef): MaterialInterface {
        return M.TapTarget.init(ref.nativeElement)
    }
}