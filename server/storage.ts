import { 
  articles, type Article, type InsertArticle,
  categories, type Category, type InsertCategory,
  resources, type Resource, type InsertResource,
  subscribers, type Subscriber, type InsertSubscriber 
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Article operations
  getAllArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticlesByCategory(categoryId: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
  
  // Resource operations
  getAllResources(): Promise<Resource[]>;
  getResourceById(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  incrementResourceDownloadCount(id: number): Promise<Resource | undefined>;
  updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource | undefined>;
  deleteResource(id: number): Promise<boolean>;
  
  // Subscriber operations
  getAllSubscribers(): Promise<Subscriber[]>;
  getSubscriberById(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  deleteSubscriber(id: number): Promise<boolean>;
}

// In-memory implementation
export class MemStorage implements IStorage {
  private articles: Map<number, Article>;
  private categories: Map<number, Category>;
  private resources: Map<number, Resource>;
  private subscribers: Map<number, Subscriber>;
  
  private articleCurrentId: number;
  private categoryCurrentId: number;
  private resourceCurrentId: number;
  private subscriberCurrentId: number;

  constructor() {
    this.articles = new Map();
    this.categories = new Map();
    this.resources = new Map();
    this.subscribers = new Map();
    
    this.articleCurrentId = 1;
    this.categoryCurrentId = 1;
    this.resourceCurrentId = 1;
    this.subscriberCurrentId = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  // Article operations
  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.slug === slug);
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.isFeatured)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.articleCurrentId++;
    const now = new Date();
    const article: Article = { 
      ...insertArticle, 
      id,
      createdAt: now 
    };
    this.articles.set(id, article);
    return article;
  }

  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const existingArticle = this.articles.get(id);
    if (!existingArticle) {
      return undefined;
    }
    
    const updatedArticle = { ...existingArticle, ...article };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deleteArticle(id: number): Promise<boolean> {
    return this.articles.delete(id);
  }

  // Category operations
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(category => category.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const existingCategory = this.categories.get(id);
    if (!existingCategory) {
      return undefined;
    }
    
    const updatedCategory = { ...existingCategory, ...category };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Resource operations
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourceById(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.resourceCurrentId++;
    const now = new Date();
    const resource: Resource = { 
      ...insertResource, 
      id,
      downloadCount: 0,
      createdAt: now
    };
    this.resources.set(id, resource);
    return resource;
  }

  async incrementResourceDownloadCount(id: number): Promise<Resource | undefined> {
    const resource = this.resources.get(id);
    if (!resource) {
      return undefined;
    }
    
    const updatedResource = { 
      ...resource, 
      downloadCount: resource.downloadCount + 1 
    };
    this.resources.set(id, updatedResource);
    return updatedResource;
  }

  async updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource | undefined> {
    const existingResource = this.resources.get(id);
    if (!existingResource) {
      return undefined;
    }
    
    const updatedResource = { ...existingResource, ...resource };
    this.resources.set(id, updatedResource);
    return updatedResource;
  }

  async deleteResource(id: number): Promise<boolean> {
    return this.resources.delete(id);
  }

  // Subscriber operations
  async getAllSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }

  async getSubscriberById(id: number): Promise<Subscriber | undefined> {
    return this.subscribers.get(id);
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      subscriber => subscriber.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberCurrentId++;
    const now = new Date();
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id,
      createdAt: now
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async deleteSubscriber(id: number): Promise<boolean> {
    return this.subscribers.delete(id);
  }

  // Initialize sample data
  private initializeSampleData() {
    // Sample categories
    const categories: InsertCategory[] = [
      {
        name: "Electoral Systems",
        slug: "electoral-systems",
        description: "Understanding different voting methods and their impacts",
        color: "#3A506B"
      },
      {
        name: "Voting Process",
        slug: "voting-process",
        description: "Step-by-step guides for voter registration and casting ballots",
        color: "#FF6B6B"
      },
      {
        name: "Media Literacy",
        slug: "media-literacy",
        description: "How to evaluate news sources and political claims",
        color: "#5BC0BE"
      },
      {
        name: "Voter Rights",
        slug: "voting-rights",
        description: "Know your rights and responsibilities as a voter",
        color: "#FF6B6B"
      }
    ];
    
    categories.forEach(category => {
      this.createCategory(category);
    });
    
    // Sample articles
    const articles: InsertArticle[] = [
      {
        title: "Understanding Your Voting Rights in 2023",
        slug: "understanding-voting-rights-2023",
        excerpt: "Stay informed about your current rights as a voter and how recent legislation may affect your participation.",
        content: "<p>This article provides a comprehensive overview of voting rights in 2023...</p><p>Recent legislation has affected how Americans vote in several key ways:</p><ul><li>ID requirements have changed in some states</li><li>Early voting periods have been adjusted</li><li>Mail-in ballot procedures have been updated</li></ul><p>Understanding these changes is essential for exercising your right to vote.</p>",
        featuredImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        categoryId: 4,
        readTime: 5,
        author: "Miranda Chen",
        isFeatured: true
      },
      {
        title: "Media Literacy: Separating Fact from Fiction",
        slug: "media-literacy-fact-fiction",
        excerpt: "How to critically evaluate news sources and political claims before casting your vote.",
        content: "<p>In today's digital landscape, voters face an unprecedented challenge: determining what information to trust...</p><p>This guide provides practical strategies to evaluate news sources:</p><ol><li>Check the source's reputation and history</li><li>Look for primary sources and data citations</li><li>Be wary of emotional language designed to trigger reactions</li><li>Cross-reference information across multiple reliable sources</li></ol>",
        featuredImage: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
        categoryId: 3,
        readTime: 8,
        author: "Alisha Patel",
        isFeatured: true
      },
      {
        title: "Why Local Elections Matter More Than You Think",
        slug: "importance-local-elections",
        excerpt: "The overlooked importance of city and county elections and their impact on your daily life.",
        content: "<p>While national elections capture most media attention, local elections often have a more direct impact on daily life...</p><p>Local elected officials make decisions about:</p><ul><li>School funding and policies</li><li>Police and public safety resources</li><li>Property taxes and local business regulations</li><li>Parks, roads, and public transportation</li></ul><p>These decisions shape your community in tangible ways that often exceed the immediate impact of federal policy changes.</p>",
        featuredImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        categoryId: 1,
        readTime: 6,
        author: "James Washington",
        isFeatured: true
      },
      {
        title: "Following the Money: Campaign Finance 101",
        slug: "campaign-finance-101",
        excerpt: "How to research who funds political campaigns and why it matters for your voting decisions.",
        content: "<p>Understanding campaign finance provides crucial context for evaluating candidates...</p><p>This article explains how to:</p><ul><li>Access and interpret public campaign finance records</li><li>Identify major donors and potential conflicts of interest</li><li>Understand PACs, Super PACs, and their influence</li><li>Evaluate a candidate based on their funding sources</li></ul>",
        featuredImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        categoryId: 2,
        readTime: 7,
        author: "Marcus Freeman",
        isFeatured: true
      }
    ];
    
    articles.forEach(article => {
      this.createArticle(article);
    });
    
    // Sample resources
    const resources: InsertResource[] = [
      {
        title: "Voter's Research Checklist",
        description: "A printable guide to researching candidates and ballot measures before election day.",
        fileUrl: "/resources/voters-research-checklist.pdf",
        iconType: "pdf",
        color: "primary"
      },
      {
        title: "Election Timeline Planner",
        description: "Interactive calendar to keep track of registration deadlines, early voting, and election days.",
        fileUrl: "https://tools.vote.org/calendar",
        iconType: "calendar",
        color: "secondary"
      },
      {
        title: "Ballot Measure Analyzer",
        description: "A framework for understanding complex ballot initiatives and referendums.",
        fileUrl: "/resources/ballot-measure-analyzer.pdf",
        iconType: "document",
        color: "accent"
      }
    ];
    
    resources.forEach(resource => {
      this.createResource(resource);
    });
  }
}

export const storage = new MemStorage();
