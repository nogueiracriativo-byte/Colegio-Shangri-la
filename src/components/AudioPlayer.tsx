"use client";

import type { Track } from '@/lib/tracks';

interface AudioPlayerProps {
  track: Track;
  nextTrackSlug?: string;
  prevTrackSlug?: string;
}

export default function AudioPlayer({ track, nextTrackSlug, prevTrackSlug }: AudioPlayerProps) {
  return (
    <div className="w-full max-w-md p-4 rounded-lg bg-card/50 backdrop-blur-sm mt-8">
      
      <iframe src={track.audioUrl} width="100%" height="60" allow="autoplay"></iframe>
      
    </div>
  );
}
