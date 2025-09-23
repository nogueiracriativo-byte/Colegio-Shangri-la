"use client";

import type { Track } from '@/lib/tracks';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  track: Track;
  nextTrackSlug?: string;
  prevTrackSlug?: string;
}

export default function AudioPlayer({ track, nextTrackSlug, prevTrackSlug }: AudioPlayerProps) {
  return (
    <div className="w-full max-w-md p-4 rounded-lg bg-card/50 backdrop-blur-sm mt-8">
      
      <iframe src={track.audioUrl} width="100%" height="60" allow="autoplay"></iframe>
      
      <div className="flex items-center justify-center gap-4 mt-4">
        <Link href={prevTrackSlug ? `/track/${prevTrackSlug}` : '#'} passHref>
          <Button variant="ghost" size="lg" className={cn("rounded-full w-16 h-16 text-muted-foreground hover:text-primary", !prevTrackSlug && "opacity-50 cursor-not-allowed")}>
            <SkipBack className="w-8 h-8" />
          </Button>
        </Link>

        <Link href={nextTrackSlug ? `/track/${nextTrackSlug}` : '#'} passHref>
          <Button variant="ghost" size="lg" className={cn("rounded-full w-16 h-16 text-muted-foreground hover:text-primary", !nextTrackSlug && "opacity-50 cursor-not-allowed")}>
            <SkipForward className="w-8 h-8" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
