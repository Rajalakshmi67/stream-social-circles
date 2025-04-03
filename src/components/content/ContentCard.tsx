
import React from 'react';
import { ContentItem } from '@/types';
import { Bookmark, Heart, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ContentCardProps {
  item: ContentItem;
  onShare?: (item: ContentItem) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onShare }) => {
  const { toast } = useToast();

  const handleAddToWatchlist = () => {
    toast({
      title: "Added to watchlist",
      description: `${item.title} has been added to your watchlist.`,
    });
  };

  const handleLike = () => {
    toast({
      title: "Liked",
      description: `You liked ${item.title}.`,
    });
  };

  const handleShare = () => {
    if (onShare) {
      onShare(item);
    } else {
      toast({
        title: "Share option",
        description: "Share functionality coming soon.",
      });
    }
  };

  return (
    <div className="movie-card group">
      <img 
        src={item.poster} 
        alt={item.title} 
        className="w-full h-full object-cover rounded-md"
        loading="lazy"
      />
      
      <div className="movie-card-overlay group-hover:opacity-100">
        <h3 className="font-bold text-white">{item.title}</h3>
        <p className="text-xs text-ott-text-secondary mt-1">{item.year} • {item.rating.toFixed(1)}⭐</p>
        <p className="text-xs text-ott-text-secondary mt-1">{item.genre.join(', ')}</p>
        
        <div className="mt-2 flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-black/50 hover:bg-ott-red/80"
            onClick={handleLike}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-black/50 hover:bg-ott-blue/80"
            onClick={handleAddToWatchlist}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-black/50 hover:bg-green-600/80"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 w-full bg-white/10 hover:bg-white/20 border-none"
            >
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-ott-card border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>{item.title}</DialogTitle>
              <DialogDescription className="text-ott-text-secondary">
                {item.year} • {item.rating.toFixed(1)}⭐ • {item.genre.join(', ')}
                {item.type === 'tv' && item.seasons && ` • ${item.seasons} Season${item.seasons > 1 ? 's' : ''}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="md:col-span-1">
                <img 
                  src={item.poster} 
                  alt={item.title} 
                  className="w-full rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <p className="text-sm">{item.overview}</p>
                
                <div className="mt-6 flex space-x-2">
                  <Button 
                    className="bg-ott-red hover:bg-ott-red/90"
                    onClick={handleAddToWatchlist}
                  >
                    Add to Watchlist
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/20 hover:bg-white/10"
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ContentCard;
