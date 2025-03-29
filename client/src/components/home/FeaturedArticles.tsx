import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedArticles() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles/featured'],
  });

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 320; // Approximate width of a card
    const currentScroll = scrollRef.current.scrollLeft;
    
    scrollRef.current.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  // Animation sequence
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    });
  }, [controls]);

  return (
    <section id="featured" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex justify-between items-end mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="uppercase text-sm tracking-wider text-accent font-medium">Featured</span>
            <h2 className="font-heading text-3xl font-bold text-neutral-800">Essential Reading</h2>
          </div>
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={() => handleScroll('left')}
              className="p-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous articles"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="p-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Next articles"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
        
        <div className="relative">
          <div 
            ref={scrollRef}
            className="horizontal-scroll overflow-x-auto flex space-x-6 pb-8"
          >
            {isLoading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-80 md:w-96 bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              articles?.map((article) => (
                <motion.article 
                  key={article.id}
                  className="card-hover flex-shrink-0 w-80 md:w-96 bg-white rounded-lg overflow-hidden shadow-md"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="h-48 bg-neutral-200 relative">
                    <img 
                      src={article.featuredImage || "https://via.placeholder.com/400x200?text=No+Image"} 
                      alt={article.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-4 left-4 bg-accent text-white text-xs uppercase tracking-wider py-1 px-3 rounded-full">
                      {article.categoryId ? "Category" : "General"}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-neutral-800 text-sm mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-800">{article.readTime || 5} min read</span>
                      <Link href={`/article/${article.slug}`}>
                        <a className="text-primary font-medium text-sm hover:underline">Read More</a>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-24 featured-gradient pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
