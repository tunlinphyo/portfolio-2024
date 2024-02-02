import BaseElement from "./helpers/element"
import Timeline from "./timeline"
import { elems } from "./helpers/utils"
import gsap from "./helpers/gsap"

export default class TechnicalAnimation extends BaseElement {
    constructor(readonly timeline: Timeline) {
        super(timeline)
    }

    protected animate() {
        this.animateEnter()
        this.animateBackground()
        this.animateCards()
        this.animateTechnicalLeave()
    }

    private animateEnter() {
        this.to(".technical-intro", {
            y: 0,
        }, "<+0.05").to(".technical", {
            y: 0,
        }, "<")
    }

    private animateBackground() {
        const scaleX = gsap.mapRange(0, window.innerWidth, 0, 1, 200)
        const scaleY = gsap.mapRange(0, window.innerHeight, 0, 1, 200)

        console.log(scaleX, scaleY)

        this.onSmallDevice(() => {
            // this.from(".technical-background", {
            //     y: '10vh',
            //     scaleX,
            //     scaleY,
            //     borderRadius: window.innerWidth * 0.5,
            //     ease: "power3.in",
            // }, ">-0.3")
            this.to(".technical-background", {
                y: 0,
                width: "100vw",
                height: "calc(100vh - 60px)",
                borderRadius: 2,
                ease: "power3.in",
            }, ">-0.3")
        })
        this.onMediumAndLargeDevice(() => {
            this.to(".technical-background", {
                y: 0,
                width: "100vw",
                height: "calc(100vh - 60px)",
                borderRadius: 2,
                ease: "power4.in",
            }, ">-0.3").to(".technical-intro .section-title", {
                scale: 4,
                opacity: 0.5,
            }, "<+0.4")
        })
    }

    private animateCards() {
        const cards = elems(".technical-card")

        this.onSmallDevice(() => {
            Array.from(cards).forEach((card, index) => {
                this.to(card, {
                    x: 0,
                    scale: 1,
                    // duration: 0.4,
                }, index ? "<" : ">-0.05")

                if (index < cards.length - 1) {
                    this.to(card, {
                        x: "-100vw",
                        scale: 0.8,
                        // duration: 0.4,
                        ease: "power1.in",
                    }, ">")
                }
            })
        })
        this.onMediumAndLargeDevice(() => {
            Array.from(cards).forEach((card, index) => {
                this.to(card, {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "circ.out",
                }, ">-0.4")

                this.animateSkills(card)

                if (index < cards.length - 1) {
                    this.to(card, {
                        x: "-100vw",
                        rotate: -15,
                        scale: 0.8,
                        duration: 0.4,
                        ease: "circ.in",
                    }, ">")
                }
            })
        })

    }

    private animateSkills(elem: HTMLElement) {
        const skills = elems(".skill-circle", elem)

        Array.from(skills).forEach((skill, index) => {
            this.from(skill, {
                background: "conic-gradient(var(--fill-color) 0%, var(--stoke-color) 0)",
                ease: "power1.out",
            }, index ? "<" : ">-0.1")
        });
    }

    private animateTechnicalLeave() {
        this.to(".technical", {
            y: "-100vh",
            scale: 0.8,
            ease: "none",
        }, ">").to(".technical-intro", {
            y: "-50vh",
            ease: "power3.out",
        }, "<")
    }

}