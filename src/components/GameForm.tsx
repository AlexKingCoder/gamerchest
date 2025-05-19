'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { GameFormProps, Game } from '@/types/game';
import { PLATFORMS, GENRES, DEFAULT_REQUIREMENTS } from '@/constants/game';

export default function GameForm({ initialData, onSubmit, isEditing = false }: GameFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [trailer, setTrailer] = useState<string>('');
  const [mainImage, setMainImage] = useState<string>('');
  const [requirements, setRequirements] = useState(DEFAULT_REQUIREMENTS);
  const [platformPrices, setPlatformPrices] = useState<Record<string, { standard: number; premium: number }>>(
    PLATFORMS.reduce((acc, platform) => ({
      ...acc,
      [platform]: { standard: 0, premium: 0 }
    }), {})
  );

  useEffect(() => {
    if (initialData) {
      setSelectedGenres(initialData.genres || []);
      setSelectedPlatforms(initialData.platforms || []);
      setImages(initialData.images || []);
      setTrailer(initialData.video || '');
      setMainImage(initialData.image || '');
      setRequirements(initialData.requirements || DEFAULT_REQUIREMENTS);
      setPlatformPrices(initialData.platformPrices || {});
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const gameData: Game = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      platformPrices,
      platforms: selectedPlatforms,
      isAvailable: formData.get('isAvailable') === 'on',
      image: mainImage,
      images,
      video: trailer,
      releaseDate: new Date(formData.get('releaseDate') as string).toISOString(),
      developer: formData.get('developer') as string,
      publisher: formData.get('publisher') as string,
      genres: selectedGenres,
      discount: Number(formData.get('discount')) || 0,
      rating: Number(formData.get('rating')) || 0,
      stock: Number(formData.get('stock')) || 0,
      requirements
    };

    // Validar campos requeridos
    if (!gameData.title) {
      setError('El título es requerido');
      setLoading(false);
      return;
    }

    if (!gameData.description) {
      setError('La descripción es requerida');
      setLoading(false);
      return;
    }

    if (!gameData.developer) {
      setError('El desarrollador es requerido');
      setLoading(false);
      return;
    }

    if (!gameData.publisher) {
      setError('El distribuidor es requerido');
      setLoading(false);
      return;
    }

    if (!gameData.releaseDate) {
      setError('La fecha de lanzamiento es requerida');
      setLoading(false);
      return;
    }

    try {
      await onSubmit(gameData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el juego');
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (platform: string, edition: 'standard' | 'premium', value: string) => {
    setPlatformPrices(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [edition]: parseFloat(value) || 0
      }
    }));
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleRequirementChange = (type: 'minimum' | 'recommended', field: string, value: string) => {
    setRequirements(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white-800 mb-8">
        {isEditing ? 'Editar Juego' : 'Crear Nuevo Juego'}
      </h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              name="title"
              defaultValue={initialData?.title}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Imagen Principal
            </label>
            <CldUploadWidget
              uploadPreset="gamer_chest"
              onSuccess={(result) => {
                const info = result.info as { secure_url: string };
                if (info && info.secure_url) {
                  setMainImage(info.secure_url);
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Subir Imagen Principal
                </button>
              )}
            </CldUploadWidget>
            {mainImage && (
              <div className="mt-4">
                <img src={mainImage} alt="Imagen principal" className="w-32 h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => setMainImage('')}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Eliminar Imagen
                </button>
              </div>
            )}
            <input type="hidden" name="image" value={mainImage} />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Desarrollador
            </label>
            <input
              type="text"
              name="developer"
              defaultValue={initialData?.developer}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Distribuidor
            </label>
            <input
              type="text"
              name="publisher"
              defaultValue={initialData?.publisher}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Fecha de Lanzamiento
            </label>
            <input
              type="date"
              name="releaseDate"
              defaultValue={initialData?.releaseDate?.split('T')[0]}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              min="0"
              defaultValue={initialData?.stock}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Descuento (%)
            </label>
            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              defaultValue={initialData?.discount}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Puntuación (0-10)
            </label>
            <input
              type="number"
              name="rating"
              min="0"
              max="10"
              step="0.1"
              defaultValue={initialData?.rating}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            defaultValue={initialData?.description}
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Plataformas Disponibles
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {PLATFORMS.map((platform) => (
              <div key={platform} className="flex items-center">
                <input
                  type="checkbox"
                  id={`platform-${platform}`}
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => handlePlatformChange(platform)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`platform-${platform}`} className="ml-2 text-white-700">
                  {platform}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Géneros
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {GENRES.map((genre) => (
              <div key={genre} className="flex items-center">
                <input
                  type="checkbox"
                  id={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={genre} className="ml-2 text-white-700 capitalize">
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white-800">Precios por Plataforma</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORMS.map((platform) => (
              <div key={platform} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">{platform}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-black text-sm mb-1">
                      Edición Estándar
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={platformPrices[platform].standard}
                      onChange={(e) => handlePriceChange(platform, 'standard', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm mb-1">
                      Edición Premium
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={platformPrices[platform].premium}
                      onChange={(e) => handlePriceChange(platform, 'premium', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white-800">Requisitos del Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Mínimos</h3>
              <div className="space-y-3">
                {Object.entries(requirements.minimum).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-black text-sm mb-1 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleRequirementChange('minimum', key, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Recomendados</h3>
              <div className="space-y-3">
                {Object.entries(requirements.recommended).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-black text-sm mb-1 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleRequirementChange('recommended', key, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white-800">Multimedia</h2>
          
          <div>
            <label className="block text-white font-medium mb-2">
              Capturas de Pantalla
            </label>
            <CldUploadWidget
              uploadPreset="gamer_chest"
              onSuccess={(result) => {
                const info = result.info as { secure_url: string };
                if (info && info.secure_url) {
                  setImages(prev => [...prev, info.secure_url]);
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Subir Imágenes
                </button>
              )}
            </CldUploadWidget>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Screenshot ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Tráiler
            </label>
            <CldUploadWidget
              uploadPreset="gamer_chest"
              onSuccess={(result) => {
                const info = result.info as { secure_url: string };
                if (info && info.secure_url) {
                  setTrailer(info.secure_url);
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Subir Tráiler
                </button>
              )}
            </CldUploadWidget>
            {trailer && (
              <div className="mt-4">
                <video src={trailer} controls className="w-full rounded-lg" />
                <button
                  type="button"
                  onClick={() => setTrailer('')}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Eliminar Tráiler
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isAvailable"
            defaultChecked={initialData?.isAvailable ?? true}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-white-700">
            Disponible
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || selectedGenres.length === 0 || selectedPlatforms.length === 0}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? (isEditing ? 'Guardando...' : 'Creando...') : (isEditing ? 'Guardar Cambios' : 'Crear Juego')}
          </button>
        </div>
      </form>
    </div>
  );
} 