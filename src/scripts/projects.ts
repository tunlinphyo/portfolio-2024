import { ElementBase } from "./base"

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    url?: string;
}

export class ProjectsAnimation extends ElementBase {
    protected readonly projects: Project[] = [
        {
            id: 1,
            title: 'Yomiuri Shimbun',
            category: 'E-commerce <br> &#10141; Ec-Cube 4.2',
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
            title: 'CoreMobile',
            category: 'Portfolio <br> &#10141; React, Next',
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
            category: 'Apparel EC <br> &#10141; Vue, VueX',
            description: `
                Fixed bugs, improved stability, and implemented new features for a Clothing simulation
                web-app for United Arrows using Vue.js and Vuex. This involved addressing issues
                left behind by the previous developer.
            `
        },
        {
            id: 4,
            title: 'Shirt Simulation',
            category: 'Coding <br> &#10141; Vue, Nuxt 3',
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
            category: 'E-commerce <br> &#10141; Svelte',
            description: `
                Created the project structure using Sapper (The predecessor of SvelteKit) and implemented APIs with the backend.
                The website was made responsive for all devices based on the UI design from the UI/UX team.
                Since the design team only provided desktop UI, I redesigned it for other views, such as mobile and tablet,
                ensuring a visually appealing and user-friendly experience across all screens.
            `,
            url: 'https://inhousemm.com/'
        }
    ]
    protected currentIndex: number = 0
    protected animating: boolean = false
    constructor(readonly selector: string) {
        super(selector)
    }

    protected init(): void {
        this.subscribe()
    }

    get rect() {
        return this.$(".project").getBoundingClientRect()
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

    private subscribe() {
        const btnOpen = this.$(".open-website")
        this.$(".control.previous").addEventListener("click", () => {
            this.renderProject("previous")
        })
        this.$(".control.next").addEventListener("click", () => {
            this.renderProject("next")
        })
        btnOpen.addEventListener("click", () => {
            const url = btnOpen.dataset.url
            this.openWebsite(url)
        })
        this.$(".close-website", document).addEventListener("click", () => {
            this.closeWebsite()
        })
    }

    private openWebsite(url?: string) {
        if (!url) return
        const iframeContainer = this.$(".iframe-container", document)
        const iframe = this.$<HTMLIFrameElement>(".iframe", iframeContainer)

        iframeContainer.classList.add("opened")
        const timeline = this.gsap.timeline()

        this.disableScroll()

        timeline.fromTo(".iframe-container", {
            y: window.innerHeight,
            opacity: 1,
            scale: 0.8,
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "circ.out",
            onComplete: () => {
                iframe.src = url
                iframe.onload = () => {
                    iframe.classList.add("ready")
                }
            }
        }).fromTo(".close-website", {
            y: 200,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1)",
        })
    }

    private closeWebsite() {
        const iframeContainer = this.$(".iframe-container", document)
        const iframe = this.$<HTMLIFrameElement>(".iframe", iframeContainer)
        const timeline = this.gsap.timeline()

        this.enableScroll()

        timeline.fromTo(".close-website", {
            y: 0,
            opacity: 1,
        }, {
            y: 200,
            opacity: 0,
            duration: 0.7,
            ease: "back.in(1)",
            onComplete: () => {
                iframe.src = ''
            }
        }).fromTo(".iframe-container", {
            y: 0,
            opacity: 1,
        }, {
            y: 0,
            opacity: 0,
            ease: this.EASE,
            onComplete: () => {
                iframeContainer.classList.remove("opened")
                iframe.classList.remove("ready")
            }
        })
    }

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

        const title = this.$(".project h3")
        const label = this.$(".project-footer label")
        const description = this.$(".project-end p")
        const controls = this.$(".projects .controls")
        const btnOpen = this.$(".open-website")

        const timeline = this.gsap.timeline()

        const fromPrev = {
            opacity: 0,
            x: Math.min(-100, this.rect.width * -0.2),
        }
        const fromNext = {
            opacity: 0,
            x: Math.max(100, this.rect.width * 0.2),
        }

        controls.classList.add("disabled")
        this.animating = true

        timeline.fromTo([title, label], {
            opacity: 1,
            x: 0,
        }, {
            opacity: 0,
            x: isNext ? this.rect.width * -0.2 : this.rect.width * 0.2,
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

        timeline.fromTo([title, label],
            isNext ? fromNext : fromPrev, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            onComplete: () => {
                controls.classList.remove("disabled")
                this.animating = false
            },
        }).fromTo(description, {
            opacity: 0,
            y: 50,
        }, {
            opacity: 1,
            y: 0,
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
    }

    private renderData() {
        const title = this.$(".project h3")
        const label = this.$(".project-footer label")
        const description = this.$(".project-end p")
        const btnOpen = this.$(".open-website")

        title.textContent = this.project.title
        label.innerHTML = this.project.category
        description.innerHTML = this.project.description
        btnOpen.dataset.url = this.project.url || ''
        this.$(".project-end").classList.toggle("with-button", !!this.project.url)
        btnOpen.style.display = this.project.url ? "flex" : "none"
    }
}