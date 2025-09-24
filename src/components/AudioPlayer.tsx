"use client";

import type { Track } from '@/lib/tracks';

interface AudioPlayerProps {
  track: Track;
}

export default function AudioPlayer({ track }: AudioPlayerProps) {
  return (
    <div className="w-full max-w-md p-4 rounded-lg bg-card/50 backdrop-blur-sm mt-8">
      <iframe 
        src={track.audioUrl}
        className="w-full h-20 rounded-md"
        allow="autoplay"
        title={`Audio player for ${track.name}`}
      ></iframe>
    </div>
  );
}
