import { MEDIA } from "./helpers/const"
import BaseElement from "./helpers/element"
import Timeline from "./timeline"
import { elems } from "./helpers/utils"
import SplitType from "split-type"

export default class FooterAnimation extends BaseElement {
    constructor(private readonly main: Timeline) {
        super()

        this.animateContacts()
    }

    private animateContacts() {
        const a = elems(".contacts a")

        this.main.media.add(MEDIA.SamllAndMedium, () => {
            this.main.timeline.from(a, {
                x: 40,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
            }, ">-0.4")
        })
        this.main.media.add(MEDIA.LargeOnly, () => {
            const links = new SplitType(a, { types: 'chars' })

            this.main.timeline.to(links.chars, {
                x: 0,
                opacity: 1,
                duration: 0.1,
                stagger: 0.01,
            }, ">-0.5")
        })
    }
}