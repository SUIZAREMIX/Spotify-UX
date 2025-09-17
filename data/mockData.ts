
import { Song, Playlist } from '../types';

export const currentSong: Song = {
  id: 'song-1',
  title: 'Starlight',
  artist: 'Muse',
  albumArtUrl: 'https://picsum.photos/seed/starlight/500/500',
  duration: 240,
};

export const userPlaylists: Playlist[] = [
  {
    id: 'pl-1',
    name: 'Rock Anthems',
    songCount: 128,
    coverArtUrl: 'https://picsum.photos/seed/rock/100/100',
  },
  {
    id: 'pl-2',
    name: 'Chill Vibes',
    songCount: 74,
    coverArtUrl: 'https://picsum.photos/seed/chill/100/100',
  },
  {
    id: 'pl-3',
    name: 'Workout Mix',
    songCount: 45,
    coverArtUrl: 'https://picsum.photos/seed/workout/100/100',
  },
  {
    id: 'pl-4',
    name: 'Indie Focus',
    songCount: 210,
    coverArtUrl: 'https://picsum.photos/seed/indie/100/100',
  },
   {
    id: 'pl-5',
    name: 'Late Night Jazz',
    songCount: 88,
    coverArtUrl: 'https://picsum.photos/seed/jazz/100/100',
  },
  {
    id: 'pl-6',
    name: '90s Throwbacks',
    songCount: 150,
    coverArtUrl: 'https://picsum.photos/seed/90s/100/100',
  },
];
