import React, { useEffect, useState } from 'react'

interface ProjectProps {
    data: {
        date: number
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
    delay: number
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
        </div>
    )
}
