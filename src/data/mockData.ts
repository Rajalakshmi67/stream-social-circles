
import { ContentItem, Group, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?img=9',
  }
];

export const mockMovies: ContentItem[] = [
  {
    id: 'm1',
    title: 'Inception',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    year: '2010',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    rating: 8.8,
    type: 'movie'
  },
  {
    id: 'm2',
    title: 'The Shawshank Redemption',
    poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    year: '1994',
    genre: ['Drama'],
    rating: 9.3,
    type: 'movie'
  },
  {
    id: 'm3',
    title: 'The Dark Knight',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    year: '2008',
    genre: ['Action', 'Crime', 'Drama'],
    rating: 9.0,
    type: 'movie'
  },
  {
    id: 'm4',
    title: 'Pulp Fiction',
    poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    year: '1994',
    genre: ['Crime', 'Drama'],
    rating: 8.9,
    type: 'movie'
  },
  {
    id: 'm5',
    title: 'The Matrix',
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    year: '1999',
    genre: ['Action', 'Sci-Fi'],
    rating: 8.7,
    type: 'movie'
  },
  {
    id: 'm6',
    title: 'Interstellar',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    year: '2014',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    rating: 8.6,
    type: 'movie'
  }
];

export const mockTvShows: ContentItem[] = [
  {
    id: 't1',
    title: 'Breaking Bad',
    poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    overview: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    year: '2008-2013',
    genre: ['Crime', 'Drama', 'Thriller'],
    rating: 9.5,
    type: 'tv',
    seasons: 5
  },
  {
    id: 't2',
    title: 'Game of Thrones',
    poster: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
    overview: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.',
    year: '2011-2019',
    genre: ['Action', 'Adventure', 'Drama'],
    rating: 9.3,
    type: 'tv',
    seasons: 8
  },
  {
    id: 't3',
    title: 'Stranger Things',
    poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    overview: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    year: '2016-present',
    genre: ['Drama', 'Fantasy', 'Horror'],
    rating: 8.7,
    type: 'tv',
    seasons: 4
  },
  {
    id: 't4',
    title: 'The Office',
    poster: 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
    overview: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
    year: '2005-2013',
    genre: ['Comedy'],
    rating: 8.9,
    type: 'tv',
    seasons: 9
  },
  {
    id: 't5',
    title: 'The Mandalorian',
    poster: 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
    overview: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    year: '2019-present',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 8.8,
    type: 'tv',
    seasons: 3
  },
  {
    id: 't6',
    title: 'The Queen\'s Gambit',
    poster: 'https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg',
    overview: 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.',
    year: '2020',
    genre: ['Drama'],
    rating: 8.6,
    type: 'tv',
    seasons: 1
  }
];

export const mockGroups: Group[] = [
  {
    id: 'g1',
    name: 'Weekend Movie Club',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdBy: mockUsers[0].id,
    inviteCode: 'WMC123'
  },
  {
    id: 'g2',
    name: 'Sci-Fi Lovers',
    members: [mockUsers[0], mockUsers[3]],
    createdBy: mockUsers[3].id,
    inviteCode: 'SFL456'
  }
];
