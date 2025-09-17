
export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  duration: number; // in seconds
}

export interface Playlist {
  id: string;
  name: string;
  songCount: number;
  coverArtUrl: string;
}
