import BaseElement from "./helpers/element"
import Timeline from "./timeline"
import { addClass, 
    // applyStyles, dataSet, 
    elem, innerHTML, innerText, removeClass, 
    // toggleClass 
} from "./helpers/utils"
// import disableScroll from "./helpers/disabled-scroll"
import gsap from "./helpers/gsap"

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    url?: string;
}

export default class ProjectsAnimation extends BaseElement {
    protected readonly projects: Project[] = [
        {
            id: 1,
            title: 'Yomiuri Shimbun',
            category: 'E-commerce &#10141; Ec-Cube 4.2',
            description: `
                Led a team in developing multiple websites for Yomiuri Shinbun using EC-Cube 4.2.
                Designed a flexible database structure to support customer customization requests.
                Implemented payment plugins such as GMO and Sony. Enabled CSV uploads for Google
                BigQuery using google/cloud-storage. Provided support to team members in UI/UX
                and the EC-Cube framework.
            `
        },
        {
            id: 2,
            title: 'Core Mobile',
            category: 'Portfolio &#10141; React, Next',
            description: `
                Created a portfolio website for CoreMobile, which included the initial loading animation and scroll
                animations using IntersectionObserver. Additionally, Trained junior developers to ensure that the
                website was responsive and suitable for all devices using Next.js (React).
            `,
            url: 'https://www.coremobile.co.jp/'
        },
        {
            id: 3,
            title: 'United Arrows',
            category: 'Apparel EC &#10141; Vue, VueX',
            description: `
                Fixed bugs, improved stability, and implemented new features for a Clothing simulation
                web-app for United Arrows using Vue.js and Vuex. This involved addressing issues
                left behind by the previous developer.
            `
        },
        {
            id: 4,
            title: 'Shirt Simulator',
            category: 'Coding &#10141; Vue, Nuxt 3',
            description: `
                A sample website for Shirt Simulation using Nuxt 3. Created custom plugins (
                <a href="https://shirt-simulation.vercel.app/document/toasts" target="_blank">Toast,</a>
                <a href="https://shirt-simulation.vercel.app/document/alerts" target="_blank">Alert,</a>
                <a href="https://shirt-simulation.vercel.app/document/confirms" target="_blank">Confirm,</a>
                <a href="https://shirt-simulation.vercel.app/document/loading" target="_blank">Loading</a>
                ) that can use with modern Js syntax.
            `,
            url: 'https://shirt-simulation.vercel.app/'
        },
        {
            id: 5,
            title: 'Inhouse Furniture',
            category: 'E-commerce &#10141; Svelte',
            description: `
                Structured the project using Sapper (predecessor of SvelteKit) and implemented APIs with the backend.
                Ensured website responsiveness across devices by adapting the UI design for desktop, redesigning for mobile
                and tablet views, ensuring a visually pleasing and user-friendly experience on all screens.
            `,
            url: 'https://inhousemm.com/'
        }
    ]
    protected currentIndex: number = 0
    protected animating: boolean = false
    constructor(readonly timeline: Timeline) {
        super(timeline)
    }

    get projectRect() {
        return elem(".project").getBoundingClientRect()
    }

    get project() {
        return this.projects[this.currentIndex]
    }

    set index(number: number) {
        const len = this.projects.length - 1

        if (number < 0) this.currentIndex = len
        else if (number > len) this.currentIndex = 0
        else this.currentIndex = number
    }

    protected subscribe() {
        // const btnOpen = elem(".open-website")
        elem(".control.previous").addEventListener("click", () => {
            this.renderProject("previous")
        })
        elem(".control.next").addEventListener("click", () => {
            this.renderProject("next")
        })
        // btnOpen.addEventListener("click", () => {
        //     const url = btnOpen.dataset.url
        //     this.openWebsite(url)
        // })
        // elem(".close-website").addEventListener("click", () => {
        //     this.closeWebsite()
        // })
    }

    protected animate(): void {
        this.animateEnter()
        this.animateProjectsIntroLeave()
        this.animateProjectsEnter()
        this.animateControls()
        this.animateProjectLeave()
    }

    private animateEnter() {
        this.to(".projects-intro", {
            y: 0,
        }, "<+0.1")
    }

    private animateProjectsIntroLeave() {
        this.onMediumAndLargeDevice(() => {
            this.to(".projects-intro .section-title", {
                y: "-20vh",
                scale: 2,
                ease: "power4.out",
            }, ">+0.1")
        })
    }

    private animateProjectsEnter() {
        this.onSmallDevice(() => {
            this.to(".project-container", {
                y: 0,
                scale: 1,
                ease: "power0",
            }, "<+0.2")
        })
        this.onMediumAndLargeDevice(() => {
            this.to(".project-container", {
                y: 0,
                scale: 1,
            }, "<-0.4")
        })
    }

    private animateControls() {
        this.fromTo(".control", {
            background: "conic-gradient(var(--fill-color) 0%, var(--stoke-color) 0)",
        }, {
            background: "conic-gradient(var(--fill-color) 100%, var(--stoke-color) 0)",
        }, ">+0.1").from(".control svg", {
            opacity: 0,
            duration: 0.2,
        }, ">-0.2").to(".footer", {
            y: 0,
        }, "<+0.1")
    }

    private animateProjectLeave() {
        this.onSmallAndMediumDevice(() => {
            this.to(".projects", {
                y: "-75vh",
                duration: 0.4,
                ease: "power0",
            }, ">")
        })
        this.onLargeDevice(() => {
            this.to(".projects", {
                y: "-75vh",
            }, ">-0.2").to(".footer-title", {
                scale: 1.8,
            }, "<+0.2")
        })
    }

    // private openWebsite(url?: string) {
    //     if (!url) return
    //     const iframeContainer = elem(".iframe-container")
    //     const iframe = elem<HTMLIFrameElement>(".iframe", iframeContainer)

    //     addClass(iframeContainer, "opened")
    //     const timeline = gsap.timeline()

    //     disableScroll.on()

    //     timeline.fromTo(".iframe-container", {
    //         y: window.innerHeight,
    //         opacity: 1,
    //         scale: 0.8,
    //     }, {
    //         y: 0,
    //         opacity: 1,
    //         scale: 1,
    //         ease: "circ.out",
    //         onComplete: () => {
    //             iframe.src = url
    //             iframe.onload = () => {
    //                 addClass(iframe, "ready")
    //             }
    //         }
    //     }).to(".close-website", {
    //         y: 0,
    //         opacity: 1,
    //         duration: 1,
    //         ease: "back.out(1)",
    //     })
    // }

    // private closeWebsite() {
    //     const iframeContainer = elem(".iframe-container")
    //     const iframe = elem<HTMLIFrameElement>(".iframe", iframeContainer)
    //     const timeline = gsap.timeline()

    //     disableScroll.off()

    //     timeline.to(".close-website", {
    //         y: 200,
    //         opacity: 0,
    //         duration: 0.7,
    //         ease: "back.in(1)",
    //         onComplete: () => {
    //             iframe.src = ''
    //         }
    //     }).to(".iframe-container", {
    //         opacity: 0,
    //         onComplete: () => {
    //             removeClass(iframeContainer, "opened")
    //             removeClass(iframe, "ready")
    //         }
    //     })
    // }

    private renderProject(action: "previous" | "next") {
        if (this.animating) return

        let isNext = true
        if (action === "previous") {
            isNext = false
            this.index = this.currentIndex - 1
        }
        if (action === "next") {
            isNext = true
            this.index = this.currentIndex + 1
        }

        const label = elem(".project-footer label")
        const controls = elem(".projects .controls")

        const timeline = gsap.timeline()

        const leave = isNext ? -1 : 1
        const enter = isNext ? 1 : -1

        addClass(controls, "disabled")
        this.animating = true

        this.onSmallAndMediumDevice(() => {
            const project = elem(".projects .project")
            const width = this.projectRect.width * 0.9

            timeline.fromTo([project, label], {
                x: 0,
            }, {
                x: width * leave,
                ease: "power2.in",
                onComplete: () => {
                    this.renderData()
                },
            })

            timeline.fromTo([project, label], {
                x: width * enter,
            }, {
                x: 0,
                duration: 0.4,
                ease: "power1.out",
                onComplete: () => {
                    removeClass(controls, "disabled")
                    this.animating = false
                },
            })
        })

        this.onLargeDevice(() => {
            const width = this.projectRect.width * 0.25
            const title = elem(".project h3")
            const description = elem(".project-end p")
            const btnOpen = elem(".open-website")

            timeline.fromTo([title, label], {
                opacity: 1,
                x: 0,
            }, {
                opacity: 0,
                x: width * leave,
                ease: "power4.in",
                onComplete: () => {
                    this.renderData()
                },
            }).fromTo(description, {
                opacity: 1,
                y: 0,
            }, {
                opacity: 0,
                y: 0,
            }, "<").to(btnOpen, {
                opacity: 0,
                y: 0,
            }, "<")

            timeline.fromTo([title, label], {
                opacity: 0,
                x: width * enter,
            }, {
                opacity: 1,
                x: 0,
                duration: 0.4,
            }).fromTo(description, {
                opacity: 0,
                y: 50,
            }, {
                opacity: 1,
                y: 0,
                onComplete: () => {
                    removeClass(controls, "disabled")
                    this.animating = false
                },
            }, ">")

            if (this.project.url) {
                timeline.fromTo(btnOpen, {
                    opacity: 0,
                    y: 50,
                }, {
                    opacity: 1,
                    y: 0,
                }, "<+0.1")
            }
        })
    }

    private renderData() {
        // const button = elem<HTMLButtonElement>(".open-website")

        innerText(".project h3", this.project.title)
        innerHTML(".project-footer label", this.project.category)
        innerHTML(".project-end p", this.project.description)

        // dataSet(button, { url: this.project.url || '' })
        // toggleClass(".project-end", "with-button", !!this.project.url)
        // applyStyles(button, {
        //     display: this.project.url ? "flex" : "none",
        // })
    }
}
