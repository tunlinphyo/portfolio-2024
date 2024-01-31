import { HEADER_HEIGHT, MEDIA } from "./helpers/const"
import BaseElement from "./helpers/element"
import gsap from "./helpers/gsap"
import Timeline from "./timeline"
import { elem } from "./helpers/utils"
import SplitType from "split-type"

export default class HeaderAnimation extends BaseElement {
    private played: boolean = false

    constructor(private readonly main: Timeline) {
        super()
        const mouse = this.animateMouse()
        this.textEffect().then(() => {
            if (window.scrollY < 10) mouse.play()
            this.played = true
        })
        this.animateButtons()
        this.animateTop()
        this.subscribe()
        this.animateScroll()
    }

    private animateScroll() {
        this.main.timeline.to(".header", {
            height: HEADER_HEIGHT,
        }).to(".header-name", {
            fontSize: "1.2rem",
        }, "<").to(".header-intro", {
            opacity: 0,
        }, "<")
    }

    private subscribe() {
        const toggleTheme = elem(".toggle-blueprint")

        elem(".contact-me .mouse").addEventListener("click", () => {
            this.gotoContact()
        })

        elem(".goto-top .mouse").addEventListener("click", () => {
            this.gotoTop()
        })

        elem(".header .header-name").addEventListener("click", () => {
            this.gotoTop()
        })

        toggleTheme.addEventListener("click", () => {
            document.body.classList.toggle("blueprint")
            const has = !!document.body.classList.contains("blueprint")
            toggleTheme.dataset.popup = has ? "Blueprint On" : "Blueprint Off"
        })
    }

    private gotoContact(duration: number = 1) {
        const timeline = gsap.timeline()

        timeline.fromTo(".jumper", {
            x: window.innerWidth,
            scaleX: 0,
        }, {
            x: 0,
            scaleX: 1,
        }).to(window, {
            duration: 0,
            scrollTo: { y: ".top-trigger" },
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
        const timeline = gsap.timeline()

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
        return new Promise((resolve) => {
            this.main.media.add(MEDIA.SmallOnly, () => {
                setTimeout(() => {
                    resolve(true)
                })
            })
            this.main.media.add(MEDIA.MediumAndLarge, () => {
                const hello = new SplitType('.header .hello', { types: 'chars' })
                const heading = new SplitType('.header-name', { types: 'chars' })
                const intro = new SplitType('.header .intro', { types: 'words' })
                const timeline = gsap.timeline()

                timeline.to([
                    ...hello.chars as HTMLElement[],
                    ...heading.chars as HTMLElement[],
                ], {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    ease: "power4.in",
                    stagger: 0.03,
                }).to(intro.words, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.02,
                    onComplete: () => {
                        resolve(true)
                    }
                })
            })
        })
    }

    private animateMouse() {
        const animation = gsap.to(".contact-me .mouse", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1)",
            paused: true,
        })

        gsap.timeline({
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
        const animation = gsap.to(".header-links .button", {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            paused: true,
        })

        gsap.timeline({
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
        const animation = gsap.to(".goto-top .mouse", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1)",
            paused: true,
        })

        gsap.timeline({
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
