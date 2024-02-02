import { SCRUB } from "./helpers/const"
import gsap from "./helpers/gsap"
import { debounce, elem } from "./helpers/utils"

export default class Timeline {
    readonly timeline: GSAPTimeline
    media: gsap.MatchMedia

    constructor() {
        gsap.scrollTrigger.config({
            // limitCallbacks: true,
            autoRefreshEvents: "resize",
            // syncInterval: 999999999,
            ignoreMobileResize: true,
        })

        gsap.scrollTrigger.saveStyles(".header-name")
        // ScrollTrigger.normalizeScroll(true)

        this.timeline = gsap.createTimeline({
            trigger: elem(".scroll-trigger"),
            start: "top bottom",
            end: "bottom bottom",
            scrub: SCRUB,
        })

        this.media = gsap.matchMedia()

        this.subscribe()
    }

    private subscribe() {
        const debounceRefresh = debounce(() => {
            this.media = gsap.matchMedia()
            this.timeline.scrollTrigger?.refresh()
        }, 500)

        gsap.scrollTrigger.addEventListener("refreshInit", () => {
            debounceRefresh()
        })
    }
}