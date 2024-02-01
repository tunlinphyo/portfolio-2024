import { elem } from './utils'

class BaseElement {
    protected sizeElem: HTMLElement

    constructor() {
        this.sizeElem = elem(".size-calculator")
    }

    get rect() {
        return this.sizeElem.getBoundingClientRect()
    }
}

export default BaseElement