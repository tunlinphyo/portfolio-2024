import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin"

class Gsap {
    private readonly gsap: GSAP
    readonly scrollTrigger: typeof ScrollTrigger

    constructor() {
        this.gsap = gsap
        this.gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
        this.scrollTrigger = ScrollTrigger
    }

    createTimeline(scrollTrigger: ScrollTrigger.Vars): GSAPTimeline {
        return this.gsap.timeline({ scrollTrigger })
    }

    timeline(vars?: gsap.TimelineVars | undefined) {
        return this.gsap.timeline(vars)
    }

    matchMedia(): gsap.MatchMedia {
        return this.gsap.matchMedia()
    }

    to(targets: gsap.TweenTarget, vars: gsap.TweenVars) {
        return gsap.to(targets, vars)
    }

    mediaRefresh() {
        this.gsap.matchMediaRefresh()
    }

    clamp(minimum: number, maximum: number, valueToClamp: number) {
        return gsap.utils.clamp(minimum, maximum, valueToClamp)
    }

    mapRange(inMin: number, inMax: number, outMin: number, outMax: number, value: number) {
        return gsap.utils.mapRange(inMin, inMax, outMin, outMax, value)
    }
}

export default new Gsap()