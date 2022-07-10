import React, { useEffect, useState, useRef } from 'react'
import { useFetch, useScript } from '@julienvanbeveren/hooks'
import Project from '../components/Project'
// @ts-ignore
import GLOBE from 'vanta/dist/vanta.globe.min'
    
export default function Homepage() {

    const { loading, error, data } = useFetch<[]>('https://raw.githubusercontent.com/julienvanbeveren/julienvanbeveren/main/projects/projects.json')

    useEffect(() => {
        GLOBE({
            el: '#hero',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x1fa8ed,
            color2: 0xffffff,
            backgroundColor: 0x0f0f1c
        })
    }, [])

    return (
        <main>
            <section id="hero">
                <div className="container hero">
                    <div className="hero-wrapper">
                        <h1>Hello 👋, I am Julien</h1>
                        <h2>Welcome to my portfolio</h2>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <h1 className="section-title">Projects</h1>
                    <div className="dividor"></div>
                    <div className="projects-grid">
                        {data && data.map((project, i) => {
                            return <Project data={project} key={i}/>
                        })}
                    </div>
                </div>
            </section>
        </main>
  )
}
