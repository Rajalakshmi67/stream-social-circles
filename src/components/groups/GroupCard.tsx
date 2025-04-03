
import React from 'react';
import { Group } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <Card className="bg-ott-card border-white/10 overflow-hidden">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{group.name}</h3>
        <p className="text-sm text-ott-text-secondary">{group.members.length} members</p>
      </CardHeader>
      
      <CardContent>
        <div className="flex -space-x-2 overflow-hidden">
          {group.members.slice(0, 4).map((member) => (
            <Avatar key={member.id} className="border-2 border-ott-card">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-ott-blue text-white">
                {member.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
          
          {group.members.length > 4 && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-ott-blue text-white text-xs">
              +{group.members.length - 4}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Link to={`/groups/${group.id}`} className="w-full">
          <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
            Open Group
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
