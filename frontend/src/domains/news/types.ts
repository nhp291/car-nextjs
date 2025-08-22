export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  tags: string[];
  author: NewsAuthor;
  featuredImage: string;
  images: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: Date;
  readTime: number;
  views: number;
  likes: number;
  shares: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum NewsCategory {
  AUTOMOTIVE = 'Automotive',
  TECHNOLOGY = 'Technology',
  REVIEWS = 'Reviews',
  NEWS = 'News',
  FEATURES = 'Features',
  INTERVIEWS = 'Interviews',
  EVENTS = 'Events'
}

export interface NewsAuthor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  email: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface NewsComment {
  id: string;
  articleId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  parentId?: string;
  likes: number;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsFilters {
  category?: NewsCategory;
  author?: string;
  tags?: string[];
  search?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  dateRange?: [Date, Date];
}

export interface NewsSearchResult {
  articles: NewsArticle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}



