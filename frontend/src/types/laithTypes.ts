type validGenders = 'male' | 'female' | 'computer'

interface Invitee {
    id: number
    name: string
    gender: validGenders
}

export type { validGenders, Invitee }
