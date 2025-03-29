import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Resource } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";

export default function VotingResources() {
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  const handleDownload = async (resourceId: number) => {
    try {
      // Record download action and increment counter
      await apiRequest('POST', `/api/resources/${resourceId}/download`, {});
    } catch (error) {
      console.error('Error recording download:', error);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'pdf':
        return <i className="fas fa-file-pdf text-white text-xl"></i>;
      case 'calendar':
        return <i className="fas fa-calendar-alt text-white text-xl"></i>;
      case 'document':
        return <i className="fas fa-file-alt text-white text-xl"></i>;
      default:
        return <i className="fas fa-file text-white text-xl"></i>;
    }
  };

  if (isLoading) {
    return (
      <section id="resources" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-4 w-28 mx-auto mb-2" />
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-neutral-200">
                <Skeleton className="h-12 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resources" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="uppercase text-sm tracking-wider text-accent font-medium">Essential</span>
          <h2 className="font-heading text-3xl font-bold text-neutral-800">Voting Resources</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-800">
            Download and utilize these resources to enhance your voting experience.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {resources?.map((resource) => (
            <motion.div 
              key={resource.id}
              className="card-hover bg-white rounded-xl overflow-hidden shadow-md border border-neutral-200"
              variants={item}
            >
              <div className={`h-12 bg-${resource.color} flex items-center justify-center`}>
                {renderIcon(resource.iconType)}
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-neutral-800 text-sm mb-4">
                  {resource.description}
                </p>
                <a 
                  href={resource.fileUrl}
                  onClick={() => handleDownload(resource.id)}
                  className={`mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-${resource.color} text-white hover:bg-opacity-90 transition-colors w-full`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.fileUrl.includes("http") ? (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" /> Access Tool
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" /> Download {resource.fileUrl.split('.').pop()?.toUpperCase()}
                    </>
                  )}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
