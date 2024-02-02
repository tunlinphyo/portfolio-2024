import { HEADER_HEIGHT } from "./helpers/const"
import BaseElement from "./helpers/element"
import gsap from "./helpers/gsap"
import Timeline from "./timeline"
import { dataSet, elem, getStyleValue, hasClass, toggleClass } from "./helpers/utils"

export default class HeaderAnimation extends BaseElement {
    constructor(readonly timeline: Timeline) {
        super(timeline)

        const mouse = this.animateMouse()
        this.animateButtons()
        this.animateTop()

        if (window.scrollY < 10) mouse.play()
    }

    protected subscribe() {
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
            toggleClass(document.body, "blueprint")
            const has = hasClass(document.body, "blueprint")
            dataSet(".toggle-blueprint", { popup: has ? "Blueprint On" : "Blueprint Off" })
        })
    }

    protected animate() {
        const fontSize = getStyleValue(".header-name", "font-size")
        const maxSize = parseInt(fontSize)
        const endScale = gsap.mapRange(0, maxSize, 0, 1, 18)

        this.to(".header", {
            height: HEADER_HEIGHT,
        }).to(".header-name", {
            // fontSize: "1.2rem",
            scale: endScale,
        }, "<").to(".header-intro", {
            opacity: 0,
            duration: 0.3,
            y: "calc(0 - 100vh)",
        }, "<")
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
                    animation.play()
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
