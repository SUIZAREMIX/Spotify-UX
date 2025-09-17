
import React from 'react';
import PlayerUI from './components/PlayerUI';
import { currentSong, userPlaylists } from './data/mockData';

const App: React.FC = () => {
  return (
    <main className="bg-neutral-800 font-sans w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-black rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-b from-purple-800 to-black text-white">
          <h1 className="text-xl font-bold text-center mb-2">UX Improvement Proposal</h1>
          <div className="text-sm bg-neutral-900 p-4 rounded-lg space-y-3">
            <div>
              <p className="font-semibold text-green-400">* Nombre de la aplicación:</p>
              <p className="text-neutral-300">Spotify</p>
            </div>
            <div>
              <p className="font-semibold text-green-400">* Descripción breve del problema:</p>
              <p className="text-neutral-300">El proceso para añadir una canción a una playlist específica requiere demasiados pasos, interrumpiendo la experiencia de escucha.</p>
            </div>
            <div>
              <p className="font-semibold text-green-400">* Descripción concisa del cambio propuesto:</p>
              <p className="text-neutral-300">Añadir un icono de "Acceso Rápido" (+) que abre una pequeña ventana con playlists recientes y una búsqueda, permitiendo añadir la canción en dos toques.</p>
            </div>
            <div>
              <p className="font-semibold text-green-400">* Una frase explicando la mejora en la UX:</p>
              <p className="text-neutral-300">Esta función agiliza drásticamente el flujo de usuario más común para organizar música, reduciendo la fricción y manteniendo al usuario inmerso en la experiencia.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-white">
        <h2 className="text-2xl font-bold">Prototipo de la Interfaz</h2>
        <p className="text-neutral-400">Interactúa con el prototipo de abajo.</p>
      </div>

      <div className="w-full max-w-md mx-auto mt-4">
        <PlayerUI song={currentSong} playlists={userPlaylists} />
      </div>
    </main>
  );
};

export default App;
