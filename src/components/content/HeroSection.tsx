
import React from 'react';
import { ContentItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Info, Play } from 'lucide-react';

interface HeroSectionProps {
  featured: ContentItem;
}

const HeroSection: React.FC<HeroSectionProps> = ({ featured }) => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background image with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${featured.poster})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ott-background via-ott-background/70 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-16 px-6 md:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">{featured.title}</h1>
        
        <div className="flex items-center space-x-4 text-ott-text-secondary mb-4">
          <span>{featured.year}</span>
          <span>⭐ {featured.rating.toFixed(1)}</span>
          <span>{featured.genre.join(', ')}</span>
          {featured.type === 'tv' && featured.seasons && (
            <span>{featured.seasons} Season{featured.seasons > 1 ? 's' : ''}</span>
          )}
        </div>
        
        <p className="text-ott-text-secondary text-sm md:text-base mb-6 max-w-2xl">
          {featured.overview}
        </p>
        
        <div className="flex flex-wrap space-x-4">
          <Button className="bg-ott-red hover:bg-ott-red/90 text-white">
            <Play className="mr-2 h-4 w-4" /> Watch Now
          </Button>
          <Button variant="outline" className="border-white/20 bg-black/30 hover:bg-black/50">
            <Info className="mr-2 h-4 w-4" /> More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
