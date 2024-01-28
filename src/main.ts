import { HeaderAnimation } from './scripts/header'
import { PageAnimation } from './scripts/page'
import { ProjectsAnimation } from './scripts/projects'
import './style.css'

document.addEventListener("DOMContentLoaded", () => {
    new PageAnimation('.main')
    new HeaderAnimation('.header')
    new ProjectsAnimation(".projects")
})