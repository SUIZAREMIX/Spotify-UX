import React, { useState, useEffect } from 'react';
import { Song, Playlist } from '../types';
import { HeartIcon, PlusIcon, PlayIcon, PauseIcon, MoreHorizontalIcon, ChevronDownIcon, CheckIcon } from './icons';
import QuickAddModal from './QuickAddModal';

interface PlayerUIProps {
  song: Song;
  playlists: Playlist[];
}

const PlayerUI: React.FC<PlayerUIProps> = ({ song, playlists }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(45); // Static progress for demo
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPlaylistName, setSelectedPlaylistName] = useState('');

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);
  

  const handleAddToPlaylist = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      setSelectedPlaylistName(playlist.name);
    }
    setShowConfirmation(true);
    setIsModalOpen(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-neutral-900 text-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button className="text-neutral-400 hover:text-white transition">
            <ChevronDownIcon className="w-6 h-6" />
          </button>
          <span className="text-xs font-bold uppercase">Now Playing</span>
          <button className="text-neutral-400 hover:text-white transition">
            <MoreHorizontalIcon className="w-6 h-6" />
          </button>
        </div>

        <img src={song.albumArtUrl} alt="Album Art" className="w-full aspect-square rounded-md shadow-2xl mb-8" />

        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">{song.title}</h2>
                <p className="text-neutral-400">{song.artist}</p>
            </div>
            <div className="flex items-center space-x-4">
                 <button onClick={() => setIsLiked(!isLiked)} className="transition">
                    <HeartIcon className={`w-6 h-6 ${isLiked ? 'text-green-500 fill-current' : 'text-neutral-400 hover:text-white'}`} />
                </button>
                {/* THIS IS THE PROPOSED UX CHANGE */}
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="text-neutral-400 hover:text-white transition p-2 rounded-full ring-2 ring-green-500/70 hover:ring-green-400 relative"
                  aria-label="Quick Add to Playlist"
                >
                  <PlusIcon className="w-6 h-6" />
                </button>
            </div>
        </div>

        <div className="mt-6">
          <div className="h-1 bg-neutral-700 rounded-full">
            <div className="h-1 bg-white rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-neutral-400 mt-1">
            <span>{formatTime(song.duration * (progress / 100))}</span>
            <span>{formatTime(song.duration)}</span>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-8 mt-4">
            {/* Player controls are for aesthetic purposes */}
            <button className="text-neutral-400 hover:text-white transition text-2xl">... </button>
            <button className="text-neutral-400 hover:text-white transition text-2xl">≪</button>
            <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform hover:scale-105 transition"
            >
                {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
            </button>
            <button className="text-neutral-400 hover:text-white transition text-2xl">≫</button>
            <button className="text-neutral-400 hover:text-white transition text-2xl">...</button>
        </div>
      </div>

      <QuickAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        playlists={playlists}
        onAddToPlaylist={handleAddToPlaylist}
        songTitle={song.title}
      />
      
      {showConfirmation && (
        <div className="absolute inset-x-0 bottom-24 flex justify-center pointer-events-none">
            <div className="bg-neutral-700 text-white py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in-out">
                <CheckIcon className="w-5 h-5 text-green-400"/>
                <span>Added to {selectedPlaylistName}</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default PlayerUI;