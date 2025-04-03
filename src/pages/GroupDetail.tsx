
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import GroupInviteDialog from '@/components/groups/GroupInviteDialog';
import ChatBox from '@/components/groups/ChatBox';
import ContentCard from '@/components/content/ContentCard';
import { mockGroups, mockMovies, mockTvShows, mockUsers } from '@/data/mockData';
import { ContentItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bookmark, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const GroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const group = mockGroups.find(g => g.id === id) || mockGroups[0];
  const [activeTab, setActiveTab] = useState('recommendations');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock recommendations as a combination of movies and TV shows
  const recommendations = [...mockMovies, ...mockTvShows]
    .slice(0, 4)
    .map(item => ({
      content: item,
      recommendedBy: mockUsers[Math.floor(Math.random() * mockUsers.length)],
    }));
  
  const handleShareContent = (item: ContentItem) => {
    toast({
      title: "Recommendation shared",
      description: `Your recommendation for "${item.title}" has been shared with the group.`,
    });
    setShowShareDialog(false);
  };

  return (
    <MainLayout>
      <div className="content-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
            <p className="text-ott-text-secondary">
              {group.members.length} members • Created by {mockUsers.find(u => u.id === group.createdBy)?.name}
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              className="bg-ott-red hover:bg-ott-red/90"
              onClick={() => setShowShareDialog(true)}
            >
              Share Recommendation
            </Button>
            <GroupInviteDialog groupName={group.name} inviteCode={group.inviteCode} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-ott-card border border-white/10 mb-6">
                <TabsTrigger value="recommendations" className="data-[state=active]:bg-ott-red">
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="members" className="data-[state=active]:bg-ott-red">
                  Members
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommendations">
                <div className="bg-ott-card rounded-lg border border-white/10 p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Recommendations</h2>
                  
                  {recommendations.length > 0 ? (
                    <div className="space-y-6">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-6 last:border-0">
                          <div className="w-full md:w-24 flex-shrink-0">
                            <img 
                              src={rec.content.poster} 
                              alt={rec.content.title} 
                              className="w-full rounded-md"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={rec.recommendedBy.avatar} />
                                <AvatarFallback className="bg-ott-blue text-xs">
                                  {rec.recommendedBy.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-ott-text-secondary">
                                Recommended by <span className="text-white">{rec.recommendedBy.name}</span>
                              </span>
                            </div>
                            
                            <h3 className="font-semibold">{rec.content.title}</h3>
                            <p className="text-sm text-ott-text-secondary mb-2">
                              {rec.content.year} • ⭐ {rec.content.rating.toFixed(1)} • {rec.content.genre.join(', ')}
                            </p>
                            <p className="text-sm line-clamp-2">{rec.content.overview}</p>
                            
                            <div className="flex space-x-2 mt-4">
                              <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10">
                                <Heart className="h-4 w-4 mr-2" /> Like
                              </Button>
                              <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10">
                                <Bookmark className="h-4 w-4 mr-2" /> Add to Watchlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-ott-text-secondary">
                        No recommendations yet. Share something with the group!
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="members">
                <div className="bg-ott-card rounded-lg border border-white/10 p-6">
                  <h2 className="text-xl font-semibold mb-4">Group Members</h2>
                  
                  <div className="space-y-4">
                    {group.members.map(member => (
                      <div key={member.id} className="flex items-center p-4 bg-black/20 rounded-lg">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-ott-blue">
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-ott-text-secondary">{member.email}</p>
                        </div>
                        
                        {member.id === group.createdBy && (
                          <span className="px-2 py-1 text-xs bg-ott-red rounded-full">
                            Group Admin
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <ChatBox groupId={group.id} currentUser={mockUsers[0]} />
          </div>
        </div>
      </div>
      
      {/* Share Recommendation Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="bg-ott-card border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Share a Recommendation</DialogTitle>
            <DialogDescription className="text-ott-text-secondary">
              Choose something to recommend to the group.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-2">
              {[...mockMovies, ...mockTvShows].map(item => (
                <div 
                  key={item.id} 
                  className="cursor-pointer"
                  onClick={() => handleShareContent(item)}
                >
                  <ContentCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default GroupDetail;
