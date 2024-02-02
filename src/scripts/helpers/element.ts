import Timeline from '../timeline'
import { MEDIA } from './const'

class BaseElement {
    constructor(private readonly main: Timeline) {
        this.subscribe()
        this.animate()
    }

    protected subscribe() {
        console.log("SUBSCRIBED")
    }

    protected animate() {
        console.log("INIT_ANIMATION")
    }

    protected to(targets: gsap.TweenTarget, vars: gsap.TweenVars, position?: gsap.Position | undefined) {
        return this.main.timeline.to(targets, vars, position)
    }

    protected from(targets: gsap.TweenTarget, vars: gsap.TweenVars, position?: gsap.Position | undefined) {
        return this.main.timeline.from(targets, vars, position)
    }

    protected fromTo(targets: gsap.TweenTarget, fromVars: gsap.TweenVars, toVars: gsap.TweenVars, position?: gsap.Position | undefined) {
        return this.main.timeline.fromTo(targets, fromVars, toVars, position)
    }

    protected onSmallDevice(func: gsap.ContextFunc, scope?: string | object | Element | undefined) {
        return this.main.media.add(MEDIA.SmallOnly, func, scope)
    }

    protected onMediumAndLargeDevice(func: gsap.ContextFunc, scope?: string | object | Element | undefined) {
        return this.main.media.add(MEDIA.MediumAndLarge, func, scope)
    }

    protected onSmallAndMediumDevice(func: gsap.ContextFunc, scope?: string | object | Element | undefined) {
        return this.main.media.add(MEDIA.SamllAndMedium, func, scope)
    }

    protected onLargeDevice(func: gsap.ContextFunc, scope?: string | object | Element | undefined) {
        return this.main.media.add(MEDIA.LargeOnly, func, scope)
    }
}

export default BaseElement