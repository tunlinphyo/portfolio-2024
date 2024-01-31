import { elem } from './utils'

class BaseElement {
    protected sizeElem: HTMLElement

    constructor() {
        this.sizeElem = elem(".size-calculator")
    }

    protected init() {
        console.log("INIT")
    }

    get rect() {
        return this.sizeElem.getBoundingClientRect()
    }
}

export default BaseElement