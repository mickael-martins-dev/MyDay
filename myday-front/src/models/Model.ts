
export type Emotion = "Distraction" | "Tristesse" | "Chagrin"
    | "Dégoût" | "Aversion" | "Etonnement" | "Surprise"
    | "Vigilance" | "Anticipation" | "Interêt" | "Ennui"
    | "Appréhension" | "Admiration" | "Confiance" | "Acceptation"
    | "Terreur" | "Peur"
    | "Colère" | "Rage" | "Extase" | "Joie"
    | "Contrariété" | "Songerie" | "Aggressivité" | "Optimisme"
    | "Amour" | "Soumission" | "Crainte" | "Mépris" | "Remords"
    | "Désappointement" | "Stress" | "Sérénité";

// Méthode : Anglais => Francais pour pouvoir le présenter bien comme il faut ! 

export interface User {
    emotions: Emotion[];
}

export interface UserRegistration extends User {
    password: string;
    email: string;
    pseudo: string;
}

export interface EmotionDetailItem {
    dateUTC: string;
    rating: number;
}

export interface EmotionDetails {
    history: EmotionDetailItem[]
}

export interface UserDetails extends User {
    details: [EmotionDetails, EmotionDetails, EmotionDetails, EmotionDetails];
}

//
// 
// 

export interface IUser {
    _id: string,
    username: string
}

export interface IFeelings {
    feelings: string[],
    phrasesGratitude: string[],
    regles: string[]
}

export interface IHistory {
    feeling1: number
    feeling2: number
    feeling3: number
    feeling4: number
    phraseGratitude: string
    regle: string
    userLocalDate: string
    timezone: string
    _id: string
    date: string
}

export interface IErrorResponse {
    errorMessage: string;
}

export type ContextType = { user: IUser, logout: () => void, loading: boolean };