"use client";

import Image from 'next/image';
import Link from 'next/link';
import { tracks } from '@/lib/tracks';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTracks, setFilteredTracks] = useState(tracks);

  useEffect(() => {
    const results = tracks.filter((track) =>
      track.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTracks(results);
  }, [searchTerm]);

  return (
    <main className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center my-8 md:my-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-primary">
          Galeria Shangri-Lá
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Sua galeria de áudios pessoal.
        </p>
      </header>
      <div className="mb-8 max-w-lg mx-auto">
        <Input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {filteredTracks.map((track) => (
          <Link href={`/track/${track.slug}`} key={track.id} className="group">
            <Card className="overflow-hidden bg-card border-transparent hover:bg-card/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={track.imageUrl}
                    alt={`Album art for ${track.name}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={track.imageHint}
                  />
                </div>
              </CardContent>
              <CardFooter className="p-3">
                <h3 className="font-semibold text-sm truncate text-primary-foreground group-hover:text-accent transition-colors">
                  {track.name}
                </h3>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
