import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function ArticlePage() {
  const [match, params] = useRoute<{ slug: string }>("/article/:slug");
  
  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: [`/api/articles/${params?.slug}`],
    enabled: !!params?.slug,
  });

  // Scroll to top when article loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <div className="flex items-center space-x-6 mb-8 mt-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="w-full h-96 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Article Not Found</h1>
        <p className="mb-8">The article you're looking for doesn't exist or has been removed.</p>
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
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <a className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Link>
        
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-6 mb-8">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{article.readTime || 5} min read</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</span>
          </div>
        </div>
        
        {article.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          {/* In a real implementation, this would use a rich text renderer */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>
    </div>
  );
}
