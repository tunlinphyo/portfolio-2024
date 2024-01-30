import { ElementBase } from "./base"
import SplitType from "split-type"

export class PageAnimation extends ElementBase {
    constructor(readonly selector: string) {
        super(selector);
    }

    protected init(): void {
        const media = this.withMedia()
        this.animateHeader()
        this.animateTechnicalIntro()
        this.animateTechnicalEnter()
        this.animateBackground(media)
        this.animateCards(media)
        this.animateTechnicalLeave()
        this.animateProjectsIntro()
        this.animateProjectsIntroLeave(media)
        this.animateProjectsEnter(media)
        this.animateFooterEnter()
        this.animateProjectLeave(media)
        this.animateContacts(media)
    }

    private animateHeader() {
        this.timeline.to(".header", {
            height: this.HEADER_HEIGHT,
            ease: this.EASE,
        }).to(".header-name", {
            fontSize: "1.2rem",
            ease: this.EASE,
        }, 0).to(".header-intro", {
            opacity: 0,
            ease: this.EASE,
        }, 0)
    }

    private animateTechnicalIntro() {
        this.timeline.to(".technical-intro", {
            y: 0,
            ease: this.EASE,
        }, "<+0.05")
    }

    private animateTechnicalEnter() {
        this.timeline.to(".technical", {
            y: 0,
            ease: this.EASE,
        }, "<")
    }

    private animateBackground(media: gsap.MatchMedia) {
        media.add("(max-width: 767px)", () => {
            this.timeline.to(".technical-background", {
                y: 0,
                width: this.rect.width,
                height: this.rect.height - this.HEADER_HEIGHT,
                borderRadius: 2,
                ease: "power3.in",
            }, ">-0.3")
        })
        media.add("(min-width: 768px)", () => {
            this.timeline.to(".technical-background", {
                y: 0,
                width: this.rect.width,
                height: this.rect.height - this.HEADER_HEIGHT,
                borderRadius: 2,
                ease: "power4.in",
            }, ">-0.3").to(".technical-intro .section-title", {
                scale: 4,
                opacity: 0.5,
                ease: this.EASE,
            }, "<+0.4")
        })
    }

    private animateCards(media: gsap.MatchMedia) {
        const cards = this.$All(".technical-card")
        const isPortrait = this.matchMedia("(orientation: portrait)")
        const leave = Math.max(this.rect.width, this.rect.height)

        media.add("(max-width: 767px)", () => {
            Array.from(cards).forEach((card, index) => {
                this.timeline.to(card, {
                    x: 0,
                    scale: 1,
                    ease: "power1.out",
                }, index ? "<" : ">-0.15")

                if (index < cards.length - 1) {
                    this.timeline.to(card, {
                        x: leave * -1,
                        scale: 0.5,
                        ease: "power1.in",
                    }, ">")
                }
            })
        })
        media.add("(min-width: 768px)", () => {
            Array.from(cards).forEach((card, index) => {
                this.timeline.to(card, {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    duration: isPortrait ? 0.3 : 0.4,
                    ease: "circ.out",
                }, isPortrait ? (index ? ">-0.2" : ">-0.4") : ">-0.4")

                this.animateSkills(card)

                if (index < cards.length - 1) {
                    this.timeline.to(card, {
                        x: leave * -1,
                        rotate: -15,
                        scale: 0.8,
                        duration: isPortrait ? 0.3 : 0.4,
                        ease: "circ.in",
                    }, ">")
                }
            })
        })

    }

    private animateSkills(elem: HTMLElement) {
        const skills = this.$All(".skill-circle", elem)

        Array.from(skills).forEach((skill) => {
            this.timeline.from(skill, {
                background: "conic-gradient(var(--fill-color) 0%, var(--stoke-color) 0)",
                ease: "power1.in",
            }, "<")
        });
    }

    private animateTechnicalLeave() {
        this.timeline.to(".technical", {
            y: this.rect.height * -1,
            scale: 0.8,
            ease: "none",
        }, ">").to(".technical-intro", {
            y: this.rect.height * -1,
            ease: "power3.out",
        }, "<")
    }

    private animateProjectsIntro() {
        this.timeline.to(".projects-intro", {
            y: 0,
            ease: this.EASE,
        }, "<+0.1")
    }

    private animateProjectsIntroLeave(media: gsap.MatchMedia) {
        media.add("(min-width: 768px)", () => {
            this.timeline.to(".projects-intro .section-title", {
                y: this.rect.height * -0.2,
                scale: 2,
                ease: "power4.out",
            }, ">+0.1")
        })
    }

    private animateProjectsEnter(media: gsap.MatchMedia) {
        media.add("(max-width: 767px)", () => {
            this.timeline.to(".project-container", {
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: this.EASE,
            }, "<+0.3")
        })
        media.add("(min-width: 768px)", () => {
            this.timeline.to(".project-container", {
                y: 0,
                scale: 1,
                ease: this.EASE,
            }, "<-0.4")
        })
    }

    private animateFooterEnter() {
        this.timeline.fromTo(".control", {
            background: "conic-gradient(var(--fill-color) 0%, var(--stoke-color) 0)",
        }, {
            background: "conic-gradient(var(--fill-color) 100%, var(--stoke-color) 0)",
            duration: 0.4,
        }, ">+0.1").from(".control svg", {
            opacity: 0,
            duration: 0.2,
        }, ">-0.2").to(".footer", {
            y: 0,
            scale: 1,
            ease: this.EASE,
        }, "<+0.1")
    }

    private animateProjectLeave(media: gsap.MatchMedia) {
        media.add("(max-width: 991px)", () => {
            this.timeline.to(".projects", {
                y: this.rect.height * -0.75,
                ease: this.EASE,
            }, ">-0.2")
        })
        media.add("(min-width: 992px)", () => {
            this.timeline.to(".projects", {
                y: this.rect.height * -0.75,
                ease: this.EASE,
            }, ">-0.2").to(".footer-title", {
                scale: 1.8,
            }, "<+0.2")
        })
    }

    private animateContacts(media: gsap.MatchMedia) {
        const a = this.$All(".contacts a")

        media.add("(max-width: 991px)", () => {
            this.timeline.from(a, {
                x: 40,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
            }, ">-0.4")
        })
        media.add("(min-width: 992px)", () => {
            const links = new SplitType(a, { types: 'chars' })

            this.timeline.to(links.chars, {
                x: 0,
                opacity: 1,
                duration: 0.1,
                ease: this.EASE,
                stagger: 0.01,
            }, ">-0.5")
        })
    }
}
