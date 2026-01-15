'use client';

import { Play, Pause } from 'lucide-react';
import { Track } from '@/app/page';

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  currentTrackId?: string;
  isPlaying: boolean;
}

export default function TrackList({ tracks, onTrackSelect, currentTrackId, isPlaying }: TrackListProps) {
  return (
    <div className="space-y-2">
      {tracks.map((track) => {
        const isCurrentTrack = track.id === currentTrackId;
        const isTrackPlaying = isCurrentTrack && isPlaying;

        return (
          <div
            key={track.id}
            onClick={() => onTrackSelect(track)}
            className="flex items-center gap-4 p-4 rounded-lg bg-gray-900/70 backdrop-blur-md hover:bg-gray-800/70 transition-colors cursor-pointer group border border-white/10"
          >
            {/* Cover Art or Placeholder */}
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden">
              {track.coverArt ? (
                <img 
                  src={track.coverArt} 
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl">🎵</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {isTrackPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-0.5" />
                )}
              </div>
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold truncate ${isCurrentTrack ? 'text-purple-400' : 'text-white'}`}>
                {track.title}
              </h3>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>

            {/* Duration */}
            <div className="text-sm text-gray-400 flex-shrink-0">
              {track.duration}
            </div>
          </div>
        );
      })}
    </div>
  );
}





