"use client";

import { useState, useRef, useEffect } from 'react';
import type { Track } from '@/lib/tracks';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  track: Track;
  nextTrackSlug?: string;
  prevTrackSlug?: string;
}

export default function AudioPlayer({ track, nextTrackSlug, prevTrackSlug }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    if (isPlaying) {
      audio.play().catch(error => console.error("Error playing audio:", error));
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="w-full max-w-md p-4 rounded-lg bg-card/50 backdrop-blur-sm mt-8">
      <audio ref={audioRef} src={track.audioUrl} preload="metadata" />

      <div className="w-full space-y-2">
        <Slider
          value={[currentTime]}
          max={duration || 1}
          step={1}
          onValueChange={handleProgressChange}
          disabled={!isClient || duration === 0}
          aria-label="Track progress"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{isClient ? formatTime(currentTime) : '0:00'}</span>
          <span>{isClient ? formatTime(duration) : '0:00'}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Link href={prevTrackSlug ? `/track/${prevTrackSlug}` : '#'} passHref>
          <Button variant="ghost" size="lg" className={cn("rounded-full w-16 h-16 text-muted-foreground hover:text-primary", !prevTrackSlug && "opacity-50 cursor-not-allowed")}>
            <SkipBack className="w-8 h-8" />
          </Button>
        </Link>

        <Button 
          variant="ghost" 
          size="lg" 
          className="rounded-full w-20 h-20 bg-primary/10 hover:bg-primary/20 text-primary" 
          onClick={togglePlayPause}
          disabled={!isClient || duration === 0}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 ml-1 fill-current" />}
        </Button>

        <Link href={nextTrackSlug ? `/track/${nextTrackSlug}` : '#'} passHref>
          <Button variant="ghost" size="lg" className={cn("rounded-full w-16 h-16 text-muted-foreground hover:text-primary", !nextTrackSlug && "opacity-50 cursor-not-allowed")}>
            <SkipForward className="w-8 h-8" />
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-2 mt-6 justify-center">
        <VolumeIcon className="w-5 h-5 text-muted-foreground" />
        <Slider
          value={[volume]}
          max={1}
          step={0.05}
          onValueChange={handleVolumeChange}
          className="w-32"
          disabled={!isClient}
          aria-label="Volume control"
        />
      </div>
    </div>
  );
}
