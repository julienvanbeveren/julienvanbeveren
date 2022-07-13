import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch, useScreen, usePersistentState, useInitialRender } from '@julienvanbeveren/hooks'
import Project, { ProjectData } from '../components/Project'
// @ts-ignore
import GLOBE from 'vanta/dist/vanta.globe.min'
    
export default function Homepage() {

    const navigate = useNavigate()
    const { loading, error, data } = useFetch<ProjectData[]>('https://raw.githubusercontent.com/julienvanbeveren/julienvanbeveren/main/projects/projects.json')
    const { screen } = useScreen([{ name: 'mobile', maxWidth: 480 }, { name: 'desktop', minWidth: 480 }])
    const [theme, setTheme] = useState('')
    const [vantaEffect, setVantaEffect] = useState<any>(null)

    useInitialRender(() => {
        const localTheme = localStorage.getItem('theme')
        const currentTheme = localTheme && ['dark', 'light'].includes(localTheme) ? localTheme : Math.random() >= 0.5 ? 'dark' : 'light'
        setTheme(currentTheme)
        localStorage.setItem('theme', currentTheme == 'dark' ? 'light' : 'dark')
    }, [])


    useEffect(() => {

        document.documentElement.style.setProperty('--primary-bg', `var(--primary-bg-${theme})`)
        document.documentElement.style.setProperty('--secondary-bg', `var(--secondary-bg-${theme})`)
        document.documentElement.style.setProperty('--secondary-bg-effect', `var(--secondary-bg-effect-${theme})`)
        document.documentElement.style.setProperty('--primary-clr', `var(--primary-clr-${theme})`)
        document.documentElement.style.setProperty('--secondary-clr', `var(--secondary-clr-${theme})`)
        document.documentElement.style.setProperty('--accent-clr', `var(--accent-clr-${theme})`)

        if (screen == 'desktop') {
            setVantaEffect(GLOBE({
                el: '#hero',
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x1fa8ed,
                color2: theme == 'dark' ? 0xffffff : 0x000000,
                backgroundColor: theme == 'dark' ? 0x0f0f1c : 0xffffff
            }))
        }
        return () => vantaEffect && vantaEffect.destroy()
    }, [screen, theme])

    
    return (
        <main>
            <section id="hero">
                <div className="container hero">
                    <div className="hero-wrapper">
                        <h1>Hello 👋, I am Julien<br/>I am a webdeveloper</h1>
                        <h2>Welcome to my portfolio</h2>
                        <p></p>
                        <button onClick={() => window.location.href = 'tel:+32468478904'}>have a drink with me ☕</button>
                    </div>
                </div>
            </section>
            <section id="projects">
                <div className="container">
                    <h1 className="section-title">Projects</h1>
                    <div className="dividor"></div>
                    <div className="projects-grid">
                        {data && data
                        .sort((a,b) => b.date - a.date)
                        .filter(project => project.highlight)
                        .map((project, i) => {
                            return <Project data={project} key={i} delay={i*100}/>
                        })}
                    </div>
                </div>
            </section>
            {/* <section id="about">
                <div className="container">
                    <h1 className="section-title">About me</h1>
                    <div className="dividor"></div>
                    
                </div>
            </section> */}
        </main>
  )
}
