
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { ChatMessage, User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatBoxProps {
  groupId: string;
  currentUser: User;
}

const ChatBox: React.FC<ChatBoxProps> = ({ groupId, currentUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      senderId: currentUser.id,
      senderName: currentUser.name,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate sending to server
    toast({
      title: "Message sent",
      description: "Your message has been sent to the group.",
      duration: 1500,
    });
  };

  // Auto-scroll to the newest messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] bg-ott-card rounded-lg border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold">Group Chat</h3>
        <p className="text-xs text-ott-text-secondary">
          Chat with group members about your favorite shows and movies
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-ott-text-secondary text-sm">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[75%] rounded-lg p-3 ${
                  msg.senderId === currentUser.id
                    ? 'ml-auto bg-ott-blue text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {msg.senderId !== currentUser.id && (
                  <p className="text-xs font-semibold mb-1">{msg.senderName}</p>
                )}
                <p>{msg.text}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-2"
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-ott-background border-white/20"
          />
          <Button type="submit" size="icon" className="bg-ott-red hover:bg-ott-red/90">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
