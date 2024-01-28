import { ElementBase } from "./base"

export class TechnicalAnimation extends ElementBase {
    constructor(readonly selector: string) {
        super(selector)
    }

    protected init(): void {
        this.animateBackground()
        this.animateCards()
    }

    private animateBackground() {
        const trigger = this.$(".technical-background-trigger", document)
        const timeline = this.createTimeline({
            trigger,
            start: "top top",
            end: "bottom top",
            scrub: this.SCRUB,
        })

        timeline.to(".technical-background", {
            y: 0,
            width: trigger.clientWidth,
            height: trigger.clientHeight - this.HEADER_HEIGHT,
            borderRadius: 0,
            ease: "power4.in",
        })
    }

    private animateCards() {
        const timeline = this.createTimeline({
            trigger: ".technical-cards-trigger",
            start: "top bottom",
            end: "bottom bottom",
            scrub: this.SCRUB,
        })

        const cards = this.$All(".technical-card")

        Array.from(cards).forEach((card) => {
            timeline.to(card, {
                x: 0,
                y: 0,
                rotate: 0,
                ease: this.EASE,
            })
        })
    }
}