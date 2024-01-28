import { ElementBase } from "./base"
import SplitType from "split-type"

export class HeaderAnimation extends ElementBase {
    private played: boolean = false
    constructor(readonly selector: string) {
        super(selector)
    }

    protected init(): void {
        const mouse = this.animateMouse()
        this.textEffect().then(() => {
            if (window.scrollY < 2) mouse.play()
            this.played = true
        })
        this.animateTop()
        this.subscribe()
    }

    private subscribe() {
        this.$(".contact-me .mouse", document).addEventListener("click", () => {
            this.gotoContact()
        })

        this.$(".goto-top .mouse", document).addEventListener("click", () => {
            this.gotoTop()
        })
    }

    private gotoContact(duration: number = 1) {
        const timeline = this.gsap.timeline()

        timeline.fromTo(".jumper", {
            x: window.innerWidth * -1,
            scaleX: 0,
        }, {
            x: 0,
            scaleX: 1,
        }).to(window, {
            duration: 0,
            scrollTo: ".top-trigger",
        }).fromTo(".jumper svg", {
            scale: 0,
            opacity: 1,
        }, {
            scale: 1,
            opacity: 1,
            duration,
            ease: "bounce.out",
        }, ">").to(".jumper", {
            x: window.innerWidth,
            scaleX: 0,
            ease: "power1.in"
        }, ">")
    }

    private gotoTop(duration: number = 1) {
        const timeline = this.gsap.timeline()

        timeline.fromTo(".jumper", {
            x: window.innerWidth,
            scaleX: 0,
        }, {
            x: 0,
            scaleX: 1,
        }).to(window, {
            duration: 0,
            ease: "none",
            scrollTo: ".mouse-trigger",
        }).fromTo(".jumper svg", {
            scale: 0,
            opacity: 1,
        }, {
            scale: 1,
            opacity: 1,
            duration,
            ease: "bounce.out",
        }, ">").to(".jumper", {
            x: window.innerWidth * -1,
            scaleX: 0,
            ease: "power1.in"
        }, ">")
    }

    private textEffect(): Promise<true> {
        const hello = new SplitType('.header .hello', { types: 'chars' })
        const heading = new SplitType('.header-name', { types: 'chars' })
        const intro = new SplitType('.header .intro', { types: 'words' })

        return new Promise((resolve) => {
            this.gsap.to([ 
                    ...hello.chars as HTMLElement[], 
                    ...heading.chars as HTMLElement[],
                    ...intro.words as HTMLElement[],
                ], {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "power4.out",
                stagger: 0.04,
                onComplete: () => {
                    resolve(true)
                }
            })
        })
    }

    private animateMouse() {
        const animation = this.gsap.to(".contact-me .mouse", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1)",
            paused: true,
        })

        this.gsap.timeline({
            scrollTrigger: {
                trigger: ".mouse-trigger",
                start: "top top",
                end: "bottom top",
                onEnter: () => {
                    animation.reverse()
                },
                onLeaveBack: () => {
                    if (this.played) animation.play()
                },
            }
        })

        return animation
    }

    private animateTop() {
        const animation = this.gsap.to(".goto-top .mouse", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1)",
            paused: true,
        })

        this.gsap.timeline({
            scrollTrigger: {
                trigger: ".top-trigger",
                start: "top bottom",
                end: "bottom bottom",
                onEnter: () => {
                    animation.play()
                },
                onLeaveBack: () => { 
                    animation.reverse()
                },
            }
        })
    }
}