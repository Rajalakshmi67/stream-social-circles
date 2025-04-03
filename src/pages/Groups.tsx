
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import GroupCard from '@/components/groups/GroupCard';
import CreateGroupDialog from '@/components/groups/CreateGroupDialog';
import { mockGroups, mockUsers } from '@/data/mockData';
import { Group } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const { toast } = useToast();

  const handleCreateGroup = (groupName: string) => {
    const newGroup: Group = {
      id: `g${groups.length + 1}`,
      name: groupName,
      members: [mockUsers[0]],
      createdBy: mockUsers[0].id,
      inviteCode: `${groupName.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 1000)}`,
    };
    
    setGroups([...groups, newGroup]);
  };

  const handleJoinWithCode = () => {
    if (!inviteCode.trim()) {
      toast({
        variant: "destructive",
        title: "Invite code required",
        description: "Please enter an invite code.",
      });
      return;
    }
    
    setIsJoining(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check if code matches any existing group
      const foundGroup = mockGroups.find(g => g.inviteCode === inviteCode);
      
      if (foundGroup) {
        toast({
          title: "Group joined",
          description: `You've successfully joined "${foundGroup.name}"!`,
        });
        setInviteCode('');
      } else {
        toast({
          variant: "destructive",
          title: "Invalid code",
          description: "The invite code you entered is invalid or expired.",
        });
      }
      
      setIsJoining(false);
    }, 1500);
  };

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="content-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Groups</h1>
            <p className="text-ott-text-secondary">
              Create and manage your watch groups
            </p>
          </div>
          
          <CreateGroupDialog onGroupCreated={handleCreateGroup} />
        </div>
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-ott-text-secondary" />
            <Input
              placeholder="Search your groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-ott-card border-white/20"
            />
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Enter invite code..."
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="bg-ott-card border-white/20"
            />
            <Button
              onClick={handleJoinWithCode}
              disabled={isJoining}
              className="bg-ott-blue hover:bg-ott-blue/90 whitespace-nowrap"
            >
              {isJoining ? "Joining..." : "Join Group"}
            </Button>
          </div>
        </div>
        
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">No groups found</h3>
            <p className="text-ott-text-secondary mt-2">
              {searchQuery ? "Try a different search term." : "Create your first group to get started!"}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Groups;
