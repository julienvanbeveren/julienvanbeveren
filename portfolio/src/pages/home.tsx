import React, { useEffect } from 'react'
import { useFetch } from '@julienvanbeveren/hooks'
import Project from '../components/Project'

export default function Homepage() {

    const { loading, error, data } = useFetch<[]>('https://raw.githubusercontent.com/julienvanbeveren/julienvanbeveren/main/projects/projects.json')

    if (data) {
        console.log(data)
    }

    return (
        <main>
            <section>
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
                        {data && data.splice(0,1).map((project, i) => {
                            return <Project data={project} key={i}/>
                        })}
                    </div>
                </div>
            </section>
        </main>
  )
}
