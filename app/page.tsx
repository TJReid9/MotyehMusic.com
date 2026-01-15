'use client';

import { useState } from 'react';
import Image from 'next/image';
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
      
      {/* Banner */}
      <div className="relative w-full h-[180px] md:h-[240px] pt-0 pb-2 z-30 bg-transparent overflow-hidden">
        <Image 
          src="/images/SpeakerNebulaLogo.png"
          alt="Motyeh Banner"
          width={1600}
          height={400}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="content-overlay">
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

