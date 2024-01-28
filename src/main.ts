import { HeaderAnimation } from './scripts/header'
import { PageAnimation } from './scripts/page'
import { ProjectsAnimation } from './scripts/projects'
import './style.css'

window.onload = () => {
    new PageAnimation('.main')
    new HeaderAnimation('.header')
    new ProjectsAnimation(".projects")
}