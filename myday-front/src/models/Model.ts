

// Singleton !!
export class EmotionRegistry {
    private emotions: Emotion[] = [];

    private constructor() {
        this.initialize();
    }

    private initialize(): void {
        this.emotions.push({ type: TEmotion.disappointment, label: 'Disappointement' });
    }

    // Return the emotion 
    public find(type: TEmotion): Emotion | undefined {
        return this.emotions.find((item) => item.type === type);
    }

    //
    // Singleton definition 
    //

    private static instance: EmotionRegistry | null = null;
    public static getInstance(): EmotionRegistry {
        if (this.instance === null) {
            this.instance = new EmotionRegistry()
        }
        return this.instance;
    }
}

export interface Emotion {
    type: TEmotion,
    label: string;
}

export enum TEmotion {
    disappointment, // désappointement
    remorse, //remords,
    contempt, // mépris,
    fear, //crainte,
    submission, //soumission,
    love, //amour,
    optimism, //optimisme,
    aggressiveness, //aggressivité,
    daydream, //songerie,
    contrariety, //contrariété,
    anger, //colère,
    rage, //rage,
    ecstasy, //extase,
    joy, //joie,
    serenity, //serenité,
    terror, //terreur,
    scare, //peur,
    appréhension,
    admiration,
    confiance,
    acceptation,
    vigilance,
    anticipation,
    interêt,
    ennui,
    dégoût,
    averion,
    étonnement,
    surprise,
    distraction,
    tristesse,
    chagrin
}

// Méthode : Anglais => Francais pour pouvoir le présenter bien comme il faut ! 

export interface User {
    uuid?: string,
    pseudo: string,
    email: string,
    emotions: TEmotion[];
}

export interface UserRegistration extends User {
    password: string
}

export interface EmotionDetailItem {
    dateUTC: string,
    rating: number;
}

export interface EmotionDetails {
    type: TEmotion, // Link to the emotion
    history: EmotionDetailItem[]
}

export interface UserDetails extends User {
    details: [EmotionDetails, EmotionDetails, EmotionDetails, EmotionDetails];
}