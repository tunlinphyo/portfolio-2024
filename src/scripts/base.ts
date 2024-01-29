import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin"
// import { Flip } from "gsap/Flip"
import disableScroll from "./disabled-scroll"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export class ElementBase {
    protected HEADER_HEIGHT = 60
    protected SCRUB = 1
    protected EASE = "power1.out"
    protected elem: HTMLElement
    protected gsap = gsap
    // protected flip = Flip
    protected scrollTrigger = ScrollTrigger
    protected timeline: gsap.core.Timeline
    protected sizeElem: HTMLElement

    constructor(readonly selector: string) {
        this.elem = this.$(selector, document)
        this.sizeElem = this.$(".size-calculator")

        this.timeline = this.createTimeline({
            trigger: this.$(".scroll-trigger"),
            start: "top bottom",
            end: "bottom bottom",
            scrub: this.SCRUB,
        })

        this.init()
    }

    protected init(): void {
        console.log("init")
    }

    get rect() {
        return this.sizeElem.getBoundingClientRect()
    }

    protected matchMedia(media: string): boolean {
        const mediaQuery = window.matchMedia(media)

        return mediaQuery.matches
    }

    protected mapRange(
        number: number,
        startRange1: number, endRange1:
        number, startRange2: number, endRange2: number
    ): number {
        if (number < startRange1) {
            number = startRange1
        } else if (number > endRange1) {
            number = endRange1
        }

        const range1 = endRange1 - startRange1
        const range2 = endRange2 - startRange2

        const mappedValue =
            ((number - startRange1) * range2) / range1 + startRange2

        return mappedValue
    }

    protected $<T extends HTMLElement>(selector: string, parent?: HTMLElement | Document): T {
        return (parent || this.elem).querySelector(selector) as T
    }

    protected $All<T extends HTMLElement>(selector: string, parent?: HTMLElement | Document): NodeListOf<T> {
        return (parent || this.elem).querySelectorAll(selector) as NodeListOf<T>
    }

    protected createTimeline(scrollTrigger: ScrollTrigger.Vars): gsap.core.Timeline {
        return this.gsap.timeline({ scrollTrigger })
    }

    protected setProperty(elem: HTMLElement, property: string, value: string | number): void {
        elem.style.setProperty(property, String(value))
    }

    protected withMedia(): gsap.MatchMedia {
        return this.gsap.matchMedia()
    }

    protected disableScroll(elem?: Element): void {
        disableScroll.on(elem)
    }

    protected enableScroll(): void {
        disableScroll.off()
    }
}