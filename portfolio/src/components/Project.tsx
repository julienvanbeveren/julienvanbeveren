import React, { useEffect, useRef, useState } from 'react'
import { useThrottle } from '@julienvanbeveren/hooks'
import Github from '../assets/Github'
import Website from '../assets/Website'

interface ProjectProps {
    data: ProjectData
    delay: number
}

export interface ProjectData {
    github: string
    ['long-description']: string
    ['short-description']: string
    name: string
    preview: string
    slug: string
    status: 'Finished' | 'Active' | 'Discontinued'
    tags: []
    website: string
    date: number
    highlight: boolean
}


export default function Project({ data, delay }: ProjectProps) {
    
    const [show, setShow] = useState(false)
    const [mousemoveEvent, setMousemoveEvent] = useState<React.MouseEvent<HTMLDivElement, MouseEvent>>()
    const projectCardRef = useRef(null)

    useThrottle(() => {
        if (mousemoveEvent && projectCardRef) {
            const e = mousemoveEvent
            const el = projectCardRef.current as unknown as HTMLElement
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            
            el.style.removeProperty('background')
            el.style.setProperty('--x', `${x}px`)
            el.style.setProperty('--y', `${y}px`)
            
        }
    }, [mousemoveEvent], 50)

    function handleMouseLeave() {
        if (mousemoveEvent && projectCardRef) {
            setTimeout(() => {
                const el = projectCardRef.current as unknown as HTMLElement
                el.style.setProperty('background', `var(--secondary-bg)`)
            }, 50)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, delay)
    }, [])
    
    return (
        <div onMouseLeave={e => handleMouseLeave()} style={{ background: 'var(--secondary-bg)' }}ref={projectCardRef} onMouseMove={e => setMousemoveEvent(e)} className={`project-card ${show ? 'visible' : 'hidden'}`}>
            <div className="project-header">
                <a style={{ textDecoration: 'none', color: 'var(--primary-clr)' }} target="blank" href={data.github || data.website}><h1>{data.slug}</h1></a>
                <p>{data['short-description']}</p>
            </div>
            <ProjectLinks data={data}/>
        </div>
    )
}

interface ProjectLinksProps {
    data: ProjectData
}

function ProjectLinks({ data }: ProjectLinksProps) {
    


    return (
        <div className="project-links-wrapper">
            {data.website && <Website link={data.website}/>}
            {data.github && <Github link={data.github}/>}
        </div>
    )
}