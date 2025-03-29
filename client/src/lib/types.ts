import { Article, Category, Resource, Subscriber } from "@shared/schema";

// Frontend specific types can be added here
export type ArticleWithCategory = Article & {
  category?: Category;
};

export type ResourceWithDownloads = Resource & {
  downloadPercent: number;
};

// Types for API responses
export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type ApiError = {
  message: string;
  status: number;
};

// Form types
export type NewsletterFormData = {
  email: string;
};

export type SearchFormData = {
  query: string;
};
