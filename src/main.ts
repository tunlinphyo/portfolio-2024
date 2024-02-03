import './style.css'
import Timeline from './scripts/timeline'
import HeaderAnimation from "./scripts/header"
import TechnicalAnimation from './scripts/technical'
import ProjectsAnimation from './scripts/project'
import FooterAnimation from './scripts/footer'
// import Animate from './scripts/animate'

window.onload = () => {
    const timeline = new Timeline()
    new HeaderAnimation(timeline)
    new TechnicalAnimation(timeline)
    new ProjectsAnimation(timeline)
    new FooterAnimation(timeline)
    // new Animate()
}