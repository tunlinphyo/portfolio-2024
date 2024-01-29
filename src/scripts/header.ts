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
        this.animateButtons()
        this.animateTop()
        this.subscribe()
    }

    private subscribe() {
        const toggleTheme = this.$(".toggle-blueprint", document)

        this.$(".contact-me .mouse", document).addEventListener("click", () => {
            this.gotoContact()
        })

        this.$(".goto-top .mouse", document).addEventListener("click", () => {
            this.gotoTop()
        })

        toggleTheme.addEventListener("click", () => {
            document.body.classList.toggle("blueprint")
            const has = !!document.body.classList.contains("blueprint")
            console.log(has)
            toggleTheme.dataset.popup = has ? "Blueprint On" : "Blueprint Off"
        })
    }

    private gotoContact(duration: number = 1) {
        const timeline = this.gsap.timeline()

        timeline.fromTo(".jumper", {
            x: window.innerWidth,
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
            x: window.innerWidth * -1,
            scaleX: 0,
            ease: "power1.in"
        }, ">")
    }

    private gotoTop(duration: number = 1) {
        const timeline = this.gsap.timeline()

        timeline.fromTo(".jumper", {
            x: window.innerWidth * -1,
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
            x: window.innerWidth,
            scaleX: 0,
            ease: "power1.in"
        }, ">")
    }

    private textEffect(): Promise<true> {
        const hello = new SplitType('.header .hello', { types: 'chars' })
        const heading = new SplitType('.header-name', { types: 'chars' })
        const intro = new SplitType('.header .intro', { types: 'words' })

        return new Promise((resolve) => {
            const timeline = this.gsap.timeline()

            timeline.to([
                    ...hello.chars as HTMLElement[],
                    ...heading.chars as HTMLElement[],
                ], {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "power4.in",
                stagger: 0.03,
            }).to(intro.words, {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                ease: this.EASE,
                stagger: 0.02,
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

    private animateButtons() {
        const animation = this.gsap.to(".header-links .button", {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            ease: this.EASE,
            paused: true,
        })

        this.gsap.timeline({
            scrollTrigger: {
                trigger: ".buttons-trigger",
                start: "top top",
                end: "bottom top",
                onEnter: () => {
                    animation.play()
                },
                onLeaveBack: () => {
                    animation.reverse()
                },
            }
        })

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
