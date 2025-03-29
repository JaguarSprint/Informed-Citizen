import { useQuery } from "@tanstack/react-query";
import { Download, ExternalLink } from "lucide-react";
import { Resource } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";

export default function ResourcesPage() {
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  const handleDownload = async (resourceId: number) => {
    try {
      await apiRequest('POST', `/api/resources/${resourceId}/download`, {});
    } catch (error) {
      console.error('Error recording download:', error);
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Skeleton className="h-8 w-64 mx-auto mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array(6).fill(0).map((_, index) => (
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
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl font-bold text-neutral-800 mb-4">Voting Resources</h1>
          <p className="max-w-2xl mx-auto text-lg text-neutral-800">
            Download and utilize these resources to enhance your voting experience and make informed decisions.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {resources?.map((resource) => (
            <motion.div 
              key={resource.id}
              className="card-hover bg-white rounded-xl overflow-hidden shadow-md border border-neutral-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
}
