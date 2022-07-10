import React from 'react'

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
}

export default function Project({ data }: ProjectProps) {
    
    
    return (
        <div className="project-card">
            <h1>{data.slug}</h1>
            <p>{data['short-description']}</p>
        </div>
    )
}
