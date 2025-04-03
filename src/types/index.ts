
export interface Movie {
  id: string;
  title: string;
  poster: string;
  overview: string;
  year: string;
  genre: string[];
  rating: number;
}

export interface TvShow {
  id: string;
  title: string;
  poster: string;
  overview: string;
  year: string;
  genre: string[];
  rating: number;
  seasons: number;
}

export interface ContentItem {
  id: string;
  title: string;
  poster: string;
  overview: string;
  year: string;
  genre: string[];
  rating: number;
  type: 'movie' | 'tv';
  seasons?: number;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  createdBy: string;
  inviteCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
}

export interface Recommendation {
  id: string;
  content: ContentItem;
  recommendedBy: User;
  timestamp: Date;
  likes: number;
  dislikes: number;
  groupId: string;
}
