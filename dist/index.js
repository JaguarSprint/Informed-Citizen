// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  articles;
  categories;
  resources;
  subscribers;
  articleCurrentId;
  categoryCurrentId;
  resourceCurrentId;
  subscriberCurrentId;
  constructor() {
    this.articles = /* @__PURE__ */ new Map();
    this.categories = /* @__PURE__ */ new Map();
    this.resources = /* @__PURE__ */ new Map();
    this.subscribers = /* @__PURE__ */ new Map();
    this.articleCurrentId = 1;
    this.categoryCurrentId = 1;
    this.resourceCurrentId = 1;
    this.subscriberCurrentId = 1;
    this.initializeSampleData();
  }
  // Article operations
  async getAllArticles() {
    return Array.from(this.articles.values());
  }
  async getArticleById(id) {
    return this.articles.get(id);
  }
  async getArticleBySlug(slug) {
    return Array.from(this.articles.values()).find((article) => article.slug === slug);
  }
  async getFeaturedArticles() {
    return Array.from(this.articles.values()).filter((article) => article.isFeatured).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async getArticlesByCategory(categoryId) {
    return Array.from(this.articles.values()).filter((article) => article.categoryId === categoryId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async createArticle(insertArticle) {
    const id = this.articleCurrentId++;
    const now = /* @__PURE__ */ new Date();
    const article = {
      ...insertArticle,
      id,
      createdAt: now
    };
    this.articles.set(id, article);
    return article;
  }
  async updateArticle(id, article) {
    const existingArticle = this.articles.get(id);
    if (!existingArticle) {
      return void 0;
    }
    const updatedArticle = { ...existingArticle, ...article };
    this.articles.set(id, updatedArticle);
    return updatedArticle;
  }
  async deleteArticle(id) {
    return this.articles.delete(id);
  }
  // Category operations
  async getAllCategories() {
    return Array.from(this.categories.values());
  }
  async getCategoryById(id) {
    return this.categories.get(id);
  }
  async getCategoryBySlug(slug) {
    return Array.from(this.categories.values()).find((category) => category.slug === slug);
  }
  async createCategory(insertCategory) {
    const id = this.categoryCurrentId++;
    const category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  async updateCategory(id, category) {
    const existingCategory = this.categories.get(id);
    if (!existingCategory) {
      return void 0;
    }
    const updatedCategory = { ...existingCategory, ...category };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }
  async deleteCategory(id) {
    return this.categories.delete(id);
  }
  // Resource operations
  async getAllResources() {
    return Array.from(this.resources.values());
  }
  async getResourceById(id) {
    return this.resources.get(id);
  }
  async createResource(insertResource) {
    const id = this.resourceCurrentId++;
    const now = /* @__PURE__ */ new Date();
    const resource = {
      ...insertResource,
      id,
      downloadCount: 0,
      createdAt: now
    };
    this.resources.set(id, resource);
    return resource;
  }
  async incrementResourceDownloadCount(id) {
    const resource = this.resources.get(id);
    if (!resource) {
      return void 0;
    }
    const updatedResource = {
      ...resource,
      downloadCount: resource.downloadCount + 1
    };
    this.resources.set(id, updatedResource);
    return updatedResource;
  }
  async updateResource(id, resource) {
    const existingResource = this.resources.get(id);
    if (!existingResource) {
      return void 0;
    }
    const updatedResource = { ...existingResource, ...resource };
    this.resources.set(id, updatedResource);
    return updatedResource;
  }
  async deleteResource(id) {
    return this.resources.delete(id);
  }
  // Subscriber operations
  async getAllSubscribers() {
    return Array.from(this.subscribers.values());
  }
  async getSubscriberById(id) {
    return this.subscribers.get(id);
  }
  async getSubscriberByEmail(email) {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email.toLowerCase() === email.toLowerCase()
    );
  }
  async createSubscriber(insertSubscriber) {
    const id = this.subscriberCurrentId++;
    const now = /* @__PURE__ */ new Date();
    const subscriber = {
      ...insertSubscriber,
      id,
      createdAt: now
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
  async deleteSubscriber(id) {
    return this.subscribers.delete(id);
  }
  // Initialize sample data
  initializeSampleData() {
    const categories2 = [
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
    categories2.forEach((category) => {
      this.createCategory(category);
    });
    const articles2 = [
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
    articles2.forEach((article) => {
      this.createArticle(article);
    });
    const resources2 = [
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
    resources2.forEach((resource) => {
      this.createResource(resource);
    });
  }
};
var storage = new MemStorage();

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  categoryId: integer("category_id"),
  readTime: integer("read_time"),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isFeatured: boolean("is_featured").default(false)
});
var categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color").notNull()
});
var resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  fileUrl: text("file_url").notNull(),
  iconType: text("icon_type").notNull(),
  color: text("color").notNull(),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
var insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true });
var insertCategorySchema = createInsertSchema(categories).omit({ id: true });
var insertResourceSchema = createInsertSchema(resources).omit({ id: true, downloadCount: true, createdAt: true });
var insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, createdAt: true });

// server/routes.ts
async function registerRoutes(app2) {
  const handleZodError = (error, res) => {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return res.status(400).json({ message: validationError.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  };
  app2.get("/api/articles/featured", async (req, res) => {
    try {
      const featuredArticles = await storage.getFeaturedArticles();
      res.json(featuredArticles);
    } catch (error) {
      console.error("Error fetching featured articles:", error);
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });
  app2.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories2 = await storage.getAllCategories();
      res.json(categories2);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  app2.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  app2.get("/api/categories/:slug/articles", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      const articles2 = await storage.getArticlesByCategory(category.id);
      res.json(articles2);
    } catch (error) {
      console.error("Error fetching category articles:", error);
      res.status(500).json({ message: "Failed to fetch category articles" });
    }
  });
  app2.get("/api/resources", async (req, res) => {
    try {
      const resources2 = await storage.getAllResources();
      res.json(resources2);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });
  app2.post("/api/resources/:id/download", async (req, res) => {
    try {
      const resourceId = parseInt(req.params.id, 10);
      if (isNaN(resourceId)) {
        return res.status(400).json({ message: "Invalid resource ID" });
      }
      const resource = await storage.incrementResourceDownloadCount(resourceId);
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json({ message: "Download recorded successfully", resource });
    } catch (error) {
      console.error("Error recording download:", error);
      res.status(500).json({ message: "Failed to record download" });
    }
  });
  app2.post("/api/subscribers", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      const subscriber = await storage.createSubscriber(validatedData);
      res.status(201).json({ message: "Subscribed successfully", subscriber });
    } catch (error) {
      handleZodError(error, res);
    }
  });
  app2.post("/api/articles", async (req, res) => {
    try {
      const validatedData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedData);
      res.status(201).json(article);
    } catch (error) {
      handleZodError(error, res);
    }
  });
  app2.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      handleZodError(error, res);
    }
  });
  app2.post("/api/resources", async (req, res) => {
    try {
      const validatedData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(validatedData);
      res.status(201).json(resource);
    } catch (error) {
      handleZodError(error, res);
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
