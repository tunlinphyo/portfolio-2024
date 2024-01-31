import { SCRUB } from "./helpers/const"
import gsap from "./helpers/gsap"
import { elem } from "./helpers/utils"

export default class Timeline {
    readonly timeline: GSAPTimeline
    readonly media: gsap.MatchMedia

    constructor() {
        this.timeline = gsap.createTimeline({
            trigger: elem(".scroll-trigger"),
            start: "top bottom",
            end: "bottom bottom",
            scrub: SCRUB,
        })

        this.media = gsap.matchMedia()
    }
}