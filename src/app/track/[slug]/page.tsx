import { tracks } from '@/lib/tracks';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AudioPlayer from '@/components/AudioPlayer';

type TrackPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return tracks.map((track) => ({
    slug: track.slug,
  }));
}

export default function TrackPage({ params }: TrackPageProps) {
  const { slug } = params;
  const trackIndex = tracks.findIndex((t) => t.slug === slug);

  if (trackIndex === -1) {
    notFound();
  }

  const track = tracks[trackIndex];
  
  const nextTrackIndex = (trackIndex + 1) % tracks.length;
  const prevTrackIndex = (trackIndex - 1 + tracks.length) % tracks.length;

  const nextTrack = tracks[nextTrackIndex];
  const prevTrack = tracks[prevTrackIndex];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="relative flex flex-col items-center text-center max-w-lg w-full">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-2xl shadow-black/50">
          <Image
            src={track.imageUrl}
            alt={`Album art for ${track.name}`}
            fill
            className="object-cover"
            priority
            data-ai-hint={track.imageHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        
        <div className="mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">{track.name}</h1>
          <p className="text-base text-muted-foreground mt-1">Artista Desconhecido</p>
        </div>

        <AudioPlayer 
          track={track}
          nextTrackSlug={nextTrack.slug}
          prevTrackSlug={prevTrack.slug}
        />
      </div>
    </div>
  );
}
