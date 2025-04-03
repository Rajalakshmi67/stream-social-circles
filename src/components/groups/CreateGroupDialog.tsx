
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface CreateGroupDialogProps {
  onGroupCreated?: (groupName: string) => void;
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({ onGroupCreated }) => {
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      toast({
        variant: "destructive",
        title: "Group name required",
        description: "Please enter a name for your group.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Group created",
        description: `Your group "${groupName}" has been created successfully!`,
      });
      
      if (onGroupCreated) {
        onGroupCreated(groupName);
      }
      
      setOpen(false);
      setGroupName('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create group",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-ott-red hover:bg-ott-red/90">Create New Group</Button>
      </DialogTrigger>
      
      <DialogContent className="bg-ott-card border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
          <DialogDescription className="text-ott-text-secondary">
            Create a group to share and discuss your favorite shows and movies with friends.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input
              id="group-name"
              placeholder="Weekend Movie Club"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="bg-ott-background border-white/20"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-white/20 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateGroup}
            className="bg-ott-red hover:bg-ott-red/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
