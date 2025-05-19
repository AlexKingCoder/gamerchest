import mongoose from 'mongoose';

interface Price {
  standard: number;
  premium: number;
}

interface PlatformPrices {
  [key: string]: Price;
}

interface Requirements {
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

const GENRES = [
  'acción',
  'aventura',
  'deportes',
  'estrategia',
  'arcade',
  'fps',
  'lucha',
  'rpg',
  'terror',
  'moba',
  'un solo jugador',
  'vr'
] as const;

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Por favor, añade un título'],
    unique: true,
    trim: true,
    maxlength: [100, 'El título no puede tener más de 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Por favor, añade una descripción'],
    maxlength: [2000, 'La descripción no puede tener más de 2000 caracteres']
  },
  platformPrices: {
    type: Map,
    of: {
      standard: Number,
      premium: Number
    },
    required: [true, 'Los precios por plataforma son requeridos'],
  },
  platforms: {
    type: [String],
    required: true,
    validate: {
      validator: function(v: string[]) {
        return v.length > 0;
      },
      message: 'Debe seleccionar al menos una plataforma'
    }
  },
  discount: {
    type: Number,
    min: [0, 'El descuento no puede ser negativo'],
    max: [100, 'El descuento no puede ser mayor a 100'],
    default: 0
  },
  releaseDate: {
    type: Date,
    required: [true, 'Por favor, añade una fecha de lanzamiento']
  },
  developer: {
    type: String,
    required: [true, 'Por favor, añade un desarrollador']
  },
  publisher: {
    type: String,
    required: [true, 'Por favor, añade un distribuidor']
  },
  rating: {
    type: Number,
    min: [0, 'La valoración no puede ser menor que 0'],
    max: [10, 'La valoración no puede ser mayor que 10'],
    default: 0
  },
  image: {
    type: String,
    required: false
  },
  images: {
    type: [String],
    default: []
  },
  trailer: {
    type: String,
    required: false
  },
  genres: {
    type: [String],
    required: [true, 'Los géneros son requeridos'],
    validate: {
      validator: function(genres: string[]) {
        return genres.every(genre => GENRES.includes(genre as any));
      },
      message: 'Género no válido. Los géneros permitidos son: ' + GENRES.join(', ')
    }
  },
  features: [{
    type: String
  }],
  requirements: {
    type: {
      minimum: {
        os: String,
        processor: String,
        memory: String,
        graphics: String,
        storage: String
      },
      recommended: {
        os: String,
        processor: String,
        memory: String,
        graphics: String,
        storage: String
      }
    },
    required: true
  },
  stock: {
    type: Number,
    required: [true, 'Por favor, añade el stock disponible'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

export default mongoose.models.Game || mongoose.model('Game', GameSchema); 