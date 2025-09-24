import { tracks } from '@/lib/tracks';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AudioPlayer from '@/components/AudioPlayer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

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
  const track = tracks.find((t) => t.slug === slug);

  if (!track) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ChevronLeft />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
      </div>
      <div className="relative flex flex-col items-center text-center max-w-lg w-full">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-2xl shadow-black/50">
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
          <p className="text-base text-muted-foreground mt-1">Colégio Shangri-lá</p>
        </div>

        <AudioPlayer 
          track={track}
        />
      </div>
    </div>
  );
}
