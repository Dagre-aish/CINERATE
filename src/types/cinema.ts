export interface Movie {
  id: string;
  title: string;
  year: number;
  runtime: string;
  director: string;
  genres: string[];
  posterUrl: string;
  backdropUrl?: string;
  criticScore: number;
  criticCount?: number;
  audienceScore: number;
  userRatingCount?: number;
  synopsis: string;
  tagline?: string;
  awards?: string;
  boxOfficeGross?: string;
  weekendGross?: string;
  boxOfficeRank?: number;
  trailerId?: string;
  badge?: string;
  badgeColor?: string;
  featuredQuote?: {
    text: string;
    critic: string;
    avatar: string;
  };
}

export interface Review {
  id: string;
  movieId: string;
  movieTitle: string;
  movieYear: number;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  isVerifiedCritic: boolean;
  score: number; // Out of 10
  content: string;
  upvotes: number;
  commentsCount: number;
  timestamp: string;
  hasSpoiler?: boolean;
}

export interface UserDiaryEntry {
  id: string;
  movieId: string;
  movieTitle: string;
  movieYear: number;
  posterUrl: string;
  score: number;
  review?: string;
  loggedDate: string;
  tags?: string[];
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  tier: string;
  filmsLogged: number;
  reviewsCount: number;
  avgScore: number;
  topDirector: string;
  favoriteGenre: string;
}
