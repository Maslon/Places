export interface Place {
    name: string,
    description: string,
    images: string[],
    coordinates
    finished?: boolean,
    ownedBy?: string,
    id: string
}

