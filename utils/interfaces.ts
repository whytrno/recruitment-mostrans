export interface CharactersInterface {
    characters: {
        results: {
            id: number;
            name: string;
            image: string;
        }[];
    }
}

interface OriginLocationInterface {
    id: number;
    name: string;
    type: string;
}

interface EpisodeInterface {
    id: number;
    name: string;
    air_date: string;
    episode: string;
}

export interface DetailCharacterInterface {
    character: {
        id: number;
        name: string;
        status: string;
        species: string;
        type: string;
        gender: string;
        image: string;
        origin: OriginLocationInterface;
        location: OriginLocationInterface;
        episode: EpisodeInterface[];
    }
}