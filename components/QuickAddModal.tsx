import React, { useState, useEffect, useMemo } from 'react';
import { Playlist } from '../types';
import { SearchIcon, PlusCircleIcon } from './icons';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToPlaylist: (playlistId: string) => void;
  playlists: Playlist[];
  songTitle: string;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onAddToPlaylist,
  playlists,
  songTitle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Reset search on open
      setSearchTerm('');
    } else {
      // Delay hiding to allow for exit animation
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredPlaylists = useMemo(() => {
    if (!searchTerm) {
        return playlists;
    }
    return playlists.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [playlists, searchTerm]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-neutral-800 w-full max-w-md rounded-t-2xl shadow-2xl p-4 pt-3 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-shrink-0">
            <div className="w-10 h-1 bg-neutral-600 rounded-full mx-auto mb-3"></div>
            <h3 className="text-lg font-bold text-center">Add to playlist</h3>
        </div>
        
        <div className="relative my-4 flex-shrink-0">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Find a playlist"
            className="w-full bg-neutral-700 text-white rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Find a playlist"
          />
        </div>

        <div className="max-h-[50vh] overflow-y-auto pr-1">
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-700 transition-colors text-left">
                <div className="w-12 h-12 bg-neutral-700 flex items-center justify-center rounded-md mr-4 flex-shrink-0">
                    <PlusCircleIcon className="w-8 h-8 text-neutral-400"/>
                </div>
                <span className="font-semibold">New playlist</span>
            </button>
            {filteredPlaylists.map(playlist => (
            <button
                key={playlist.id}
                onClick={() => onAddToPlaylist(playlist.id)}
                className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-700 transition-colors text-left"
            >
                <img
                src={playlist.coverArtUrl}
                alt={playlist.name}
                className="w-12 h-12 rounded-md mr-4 flex-shrink-0"
                />
                <div>
                <p className="font-semibold truncate">{playlist.name}</p>
                <p className="text-sm text-neutral-400">{playlist.songCount} songs</p>
                </div>
            </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
