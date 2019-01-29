export interface Place {
    name: string
    description: string
    images: string[]
    coordinates: number[]
    website: string
    notes?: string[]
    finished?: boolean
    ownedBy?: string
    id: string
}

