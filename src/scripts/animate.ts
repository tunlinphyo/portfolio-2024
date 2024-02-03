import { SCRUB } from "./helpers/const"
import gsap from "./helpers/gsap"
import { elem } from "./helpers/utils"

export default class Animate {
    constructor() {
        this.run()
    }

    run() {
        const container = elem(".six-cross .container")
        const cross = elem(".cross", container)

        const timeline = gsap.createTimeline({
            trigger: elem(".scroll-trigger"),
            start: "top bottom",
            end: "bottom bottom",
            scrub: SCRUB,
        })

        timeline.to(cross, {
            rotate: 360 * 2,
            ease: "none",
        })
    }
}