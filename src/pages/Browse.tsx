
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ContentCard from '@/components/content/ContentCard';
import { mockMovies, mockTvShows } from '@/data/mockData';
import { ContentItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState<'all' | 'movie' | 'tv'>('all');
  const [sortOption, setSortOption] = useState<'rating' | 'year'>('rating');
  const [minRating, setMinRating] = useState<number>(0);
  const [genres, setGenres] = useState<string[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  
  // Combine all content
  const allContent = [...mockMovies, ...mockTvShows];
  
  // Get unique genres
  const allGenres = Array.from(
    new Set(allContent.flatMap(item => item.genre))
  ).sort();
  
  useEffect(() => {
    let filtered = [...allContent];
    
    // Filter by content type
    if (contentType === 'movie') {
      filtered = filtered.filter(item => item.type === 'movie');
    } else if (contentType === 'tv') {
      filtered = filtered.filter(item => item.type === 'tv');
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.overview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by minimum rating
    if (minRating > 0) {
      filtered = filtered.filter(item => item.rating >= minRating);
    }
    
    // Filter by selected genres
    if (genres.length > 0) {
      filtered = filtered.filter(item => 
        item.genre.some(g => genres.includes(g))
      );
    }
    
    // Sort the results
    if (sortOption === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'year') {
      filtered.sort((a, b) => {
        const yearA = parseInt(a.year.split('-')[0]);
        const yearB = parseInt(b.year.split('-')[0]);
        return yearB - yearA;
      });
    }
    
    setFilteredContent(filtered);
  }, [searchQuery, contentType, sortOption, minRating, genres]);
  
  const handleGenreToggle = (genre: string) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter(g => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };
  
  const clearAllFilters = () => {
    setSearchQuery('');
    setContentType('all');
    setSortOption('rating');
    setMinRating(0);
    setGenres([]);
  };

  return (
    <MainLayout>
      <div className="content-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">Browse</h1>
            <p className="text-ott-text-secondary">
              Discover new movies and TV shows
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-ott-text-secondary" />
            <Input
              placeholder="Search titles, actors, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-ott-card border-white/20"
            />
          </div>
          
          <Select
            value={contentType}
            onValueChange={(value) => setContentType(value as 'all' | 'movie' | 'tv')}
          >
            <SelectTrigger className="w-full md:w-40 bg-ott-card border-white/20">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-ott-card border-white/10 text-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="movie">Movies</SelectItem>
              <SelectItem value="tv">TV Shows</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as 'rating' | 'year')}
          >
            <SelectTrigger className="w-full md:w-40 bg-ott-card border-white/20">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-ott-card border-white/10 text-white">
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 w-full md:w-auto">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-ott-card border-l-white/10 text-white">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription className="text-ott-text-secondary">
                  Customize your browsing experience
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Minimum Rating</h3>
                  <div className="px-1">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>0</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                    <Slider
                      value={[minRating]}
                      min={0}
                      max={10}
                      step={0.5}
                      onValueChange={(value) => setMinRating(value[0])}
                      className="mb-1"
                    />
                    <p className="text-center text-sm">
                      {minRating > 0 ? `${minRating}+ stars` : 'Any rating'}
                    </p>
                  </div>
                </div>
                
                <Separator className="bg-white/10" />
                
                <div>
                  <h3 className="font-medium mb-2">Genres</h3>
                  <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                    {allGenres.map(genre => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox
                          id={`genre-${genre}`}
                          checked={genres.includes(genre)}
                          onCheckedChange={() => handleGenreToggle(genre)}
                        />
                        <Label htmlFor={`genre-${genre}`}>{genre}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="bg-white/10" />
                
                <Button 
                  onClick={clearAllFilters} 
                  variant="outline" 
                  className="w-full border-white/20 hover:bg-white/10"
                >
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredContent.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-ott-card rounded-lg border border-white/10">
            <h3 className="text-xl font-semibold">No results found</h3>
            <p className="text-ott-text-secondary mt-2">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              onClick={clearAllFilters} 
              className="mt-4 bg-ott-red hover:bg-ott-red/90"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Browse;
