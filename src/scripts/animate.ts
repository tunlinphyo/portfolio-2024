import gsap from "./helpers/gsap"
import { elem } from "./helpers/utils"

export default class Animate {
    constructor() {
        this.run()
    }

    run() {
        const cross = elem(".six-cross")

        const timeline = gsap.createTimeline({
            trigger: elem(".scroll-trigger"),
            start: "top bottom",
            end: "bottom bottom",
            scrub: 3,
        })

        timeline.to(cross, {
            rotate: 360,
            ease: "none",
        })
    }
}