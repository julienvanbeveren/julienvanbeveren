import React, { useEffect } from 'react'
import { useFetch } from '@julienvanbeveren/hooks'

export default function Homepage() {

    const { loading, error, data } = useFetch<{}>('')


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
                    <div className="projects-grid">

                    </div>
                </div>
            </section>
        </main>
  )
}
