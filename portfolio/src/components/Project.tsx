import React, { useEffect, useState } from 'react'
import Github from '../assets/Github'

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
}

export default function Project({ data, delay }: ProjectProps) {
    
    const [show, setShow] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, delay)
    }, [])
    
    return (
        <div className={`project-card ${show ? 'visible' : 'hidden'}`}>
            <h1>{data.slug}</h1>
            <p>{data['short-description']}</p>
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
            {data.github && <Github />}
        </div>
    )
}