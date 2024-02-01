import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SCRUB } from "./helpers/const"
import gsap from "./helpers/gsap"
import { elem } from "./helpers/utils"

export default class Timeline {
    readonly timeline: GSAPTimeline
    readonly media: gsap.MatchMedia

    private scrollFunc: ScrollTrigger.ScrollFunc
    private lastScrollPosition: number = 0

    constructor() {
        ScrollTrigger.config({
            limitCallbacks: true,
            ignoreMobileResize: true,
        })
        
        ScrollTrigger.saveStyles(".header-name")
        // ScrollTrigger.normalizeScroll(true)

        this.timeline = gsap.createTimeline({
            trigger: elem(".scroll-trigger"),
            start: "top bottom",
            end: "bottom bottom",
            scrub: SCRUB,
        })

        this.media = gsap.matchMedia()
        this.scrollFunc = ScrollTrigger.getScrollFunc(window)

        this.subscribe()
    }

    private subscribe() {
        ScrollTrigger.addEventListener("refreshInit", () => {
            this.lastScrollPosition = window.scrollY
            this.scrollFunc(0)
        })

        ScrollTrigger.addEventListener("refresh", () => {
            // this.timeline.scrollTrigger?.refresh()
            // ScrollTrigger.refresh()
            this.scrollFunc(this.lastScrollPosition)
        })
    }
}