'use client';

import { useState } from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import TrackList from '@/components/TrackList';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
  coverArt?: string;
}

const tracks: Track[] = [
  {
    id: '1',
    title: 'Groovology',
    artist: 'Motyeh',
    duration: '5:25',
    audioUrl: '/audio/Groovology.mp3',
    coverArt: '/images/Motyeh Butterfly Nebula.png',
  },
  {
    id: '2',
    title: 'At Ease',
    artist: 'Motyeh',
    duration: '3:54',
    audioUrl: '/audio/At Ease.mp3',
    coverArt: '/images/Motyeh Butterfly Nebula.png',
  },
  {
    id: '3',
    title: 'Every Direction',
    artist: 'Motyeh',
    duration: '4:00',
    audioUrl: '/audio/Every Direction.mp3',
    coverArt: '/images/Motyeh Butterfly Nebula.png',
  },
];

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrackSelect = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* Music Note Nebula Background */}
      <div className="butterfly-nebula-bg"></div>

      {/* Content */}
      <div className="content-overlay">
        {/* Header Section */}
        <section className="pt-20 pb-12 px-4 md:px-8 relative text-center">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h1 className="text-7xl md:text-9xl font-bold mb-4 platinum-text">MOTYEH</h1>
            <p className="text-2xl md:text-3xl font-semibold tracking-wider" style={{
              color: '#a855f7',
              WebkitTextStroke: '2px rgba(0,0,0,0.9)',
              textStroke: '2px rgba(0,0,0,0.9)',
              textShadow: '-2px -2px 0 rgba(0,0,0,0.9), 2px -2px 0 rgba(0,0,0,0.9), -2px 2px 0 rgba(0,0,0,0.9), 2px 2px 0 rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)'
            }}>
              Audio Production and Sound Design
            </p>
          </div>
        </section>

        {/* Music Section */}
        <section className="py-20 px-4 md:px-8 relative">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-bold mb-12 text-center platinum-text">Music</h2>
            <TrackList 
              tracks={tracks} 
              onTrackSelect={handleTrackSelect}
              currentTrackId={currentTrack?.id}
              isPlaying={isPlaying}
            />
          </div>
        </section>

        {/* Music Player */}
        {currentTrack && (
          <MusicPlayer
            track={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onTrackEnd={() => {
              const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
              const nextTrack = tracks[currentIndex + 1] || tracks[0];
              setCurrentTrack(nextTrack);
              setIsPlaying(true);
            }}
          />
        )}
      </div>
    </main>
  );
}

