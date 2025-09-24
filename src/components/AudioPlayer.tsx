"use client";

import type { Track } from '@/lib/tracks';

interface AudioPlayerProps {
  track: Track;
}

export default function AudioPlayer({ track }: AudioPlayerProps) {
  return (
    <div className="w-full max-w-md p-4 rounded-lg bg-card/50 backdrop-blur-sm mt-8">
      <audio controls src={track.audioUrl} className="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
