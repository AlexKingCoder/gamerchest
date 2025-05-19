'use client';

const Hero = () => {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/theLastOfUs2Trailer.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Botón centrado */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button className="bg-white/80 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors">
          Consíguelo Ahora
        </button>
      </div>
    </div>
  );
};

export default Hero; 