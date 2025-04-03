
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Copy, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GroupInviteDialogProps {
  groupName: string;
  inviteCode: string;
}

const GroupInviteDialog: React.FC<GroupInviteDialogProps> = ({ groupName, inviteCode }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const inviteLink = `https://streamcircle.example.com/join/${inviteCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(
      () => {
        toast({
          title: "Link copied",
          description: "Invite link copied to clipboard!",
        });
      },
      () => {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Please try again or copy the link manually.",
        });
      }
    );
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: `Join my ${groupName} group on StreamCircle`,
        text: `I'd like to invite you to my StreamCircle group: ${groupName}`,
        url: inviteLink,
      }).catch(() => {
        // Fallback if share fails
        handleCopyLink();
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      handleCopyLink();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white/20 hover:bg-white/10">
          <Share className="h-4 w-4 mr-2" /> Invite Friends
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-ott-card border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Invite Friends to {groupName}</DialogTitle>
          <DialogDescription className="text-ott-text-secondary">
            Share this link with friends to invite them to your group.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 py-4">
          <Input
            readOnly
            value={inviteLink}
            className="bg-ott-background border-white/20"
          />
          <Button
            size="icon"
            onClick={handleCopyLink}
            className="bg-ott-blue hover:bg-ott-blue/90"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        <DialogFooter>
          <Button
            onClick={handleShareLink}
            className="bg-ott-red hover:bg-ott-red/90 w-full"
          >
            <Share className="h-4 w-4 mr-2" /> Share Invite Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInviteDialog;
