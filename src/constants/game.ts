export const PLATFORMS = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'] as const;

export const GENRES = [
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

export const DEFAULT_REQUIREMENTS = {
  minimum: {
    os: '',
    processor: '',
    memory: '',
    graphics: '',
    storage: ''
  },
  recommended: {
    os: '',
    processor: '',
    memory: '',
    graphics: '',
    storage: ''
  }
}; 