import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Category, Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function TopicPage() {
  const [match, params] = useRoute<{ slug: string }>("/topic/:slug");
  
  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: [`/api/categories/${params?.slug}`],
    enabled: !!params?.slug,
  });
  
  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: [`/api/categories/${params?.slug}/articles`],
    enabled: !!params?.slug,
  });

  const isLoading = categoryLoading || articlesLoading;

  // Scroll to top when topic loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.slug]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Topic Not Found</h1>
        <p className="mb-8">The topic you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <a className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <a className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Link>
        
        <div className="mb-12">
          <div 
            className="inline-block text-xs uppercase tracking-wider py-1 px-3 rounded-full mb-4"
            style={{ 
              backgroundColor: `${category.color}20`, 
              color: category.color 
            }}
          >
            Topic
          </div>
          <h1 className="font-heading text-4xl font-bold text-neutral-800 mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-neutral-800 max-w-3xl">
            {category.description}
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {articles && articles.length > 0 ? (
            articles.map(article => (
              <motion.div
                key={article.id}
                className="card-hover bg-white rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {article.featuredImage && (
                  <div className="h-48 bg-neutral-200 relative">
                    <img 
                      src={article.featuredImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-neutral-800 text-sm mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-800 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime || 5} min read
                    </span>
                    <Link href={`/article/${article.slug}`}>
                      <a className="text-primary font-medium text-sm hover:underline">Read More</a>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-neutral-800">No articles found for this topic.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
