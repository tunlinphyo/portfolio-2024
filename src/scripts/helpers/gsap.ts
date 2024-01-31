import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin"

class Gsap {
    private readonly gsap: GSAP

    constructor() {
        this.gsap = gsap
        this.gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
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
}

export default new Gsap()