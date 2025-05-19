export interface Requirements {
  minimum: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  recommended: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface Game {
  _id?: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  trailer?: string;
  platforms: string[];
  genres: string[];
  platformPrices: {
    [key: string]: {
      standard: number;
      premium: number;
    };
  };
  discount: number;
  stock: number;
  isAvailable: boolean;
  requirements: Requirements;
  developer: string;
  publisher: string;
  releaseDate: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GameFormProps {
  initialData?: Game;
  onSubmit: (data: Game) => Promise<void>;
  isEditing?: boolean;
} 