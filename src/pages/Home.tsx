
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/content/HeroSection';
import ContentRow from '@/components/content/ContentRow';
import { mockMovies, mockTvShows } from '@/data/mockData';
import { ContentItem } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  const { toast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  const handleShareContent = (item: ContentItem) => {
    setSelectedContent(item);
    setShareDialogOpen(true);
  };

  const handleShareToGroup = () => {
    toast({
      title: "Shared successfully",
      description: `${selectedContent?.title} has been shared with your group.`,
    });
    setShareDialogOpen(false);
  };

  // Combine and shuffle movies and TV shows to create a "For You" section
  const forYouContent = [...mockMovies, ...mockTvShows]
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  // Filter for trending content (using rating as a proxy)
  const trendingContent = [...mockMovies, ...mockTvShows]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <MainLayout>
      {/* Hero Section with featured content */}
      <HeroSection featured={trendingContent[0]} />
      
      <div className="content-container py-8">
        {/* Personalized Recommendations */}
        <ContentRow 
          title="For You" 
          items={forYouContent} 
          onShareContent={handleShareContent} 
        />
        
        {/* Trending Content */}
        <ContentRow 
          title="Trending Now" 
          items={trendingContent} 
          onShareContent={handleShareContent}
        />
        
        {/* Movies Section */}
        <ContentRow 
          title="Popular Movies" 
          items={mockMovies} 
          onShareContent={handleShareContent}
        />
        
        {/* TV Shows Section */}
        <ContentRow 
          title="Top TV Shows" 
          items={mockTvShows} 
          onShareContent={handleShareContent}
        />
      </div>
      
      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="bg-ott-card border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Share "{selectedContent?.title}"</DialogTitle>
            <DialogDescription className="text-ott-text-secondary">
              Choose a group to share this recommendation with.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                className="justify-start text-left border-white/20 hover:bg-white/10"
                onClick={handleShareToGroup}
              >
                Weekend Movie Club
              </Button>
              <Button 
                variant="outline" 
                className="justify-start text-left border-white/20 hover:bg-white/10"
                onClick={handleShareToGroup}
              >
                Sci-Fi Lovers
              </Button>
            </div>
            
            <div className="pt-2 text-center">
              <Link to="/groups">
                <Button variant="link" className="text-ott-blue">
                  Create a new group
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Home;
