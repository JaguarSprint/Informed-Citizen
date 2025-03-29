import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopicCategories() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <section id="topics" className="py-16 bg-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-4 w-32 mx-auto mb-2" />
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>
          
          <div className="asymmetric-grid">
            {/* Loading skeletons for the grid */}
            <div className="col-span-12 md:col-span-8 row-span-2 bg-white rounded-xl overflow-hidden shadow-md">
              <Skeleton className="w-full h-[300px]" />
            </div>
            <div className="col-span-12 md:col-span-4 row-span-1 bg-white rounded-xl overflow-hidden shadow-md">
              <Skeleton className="w-full h-[150px]" />
            </div>
            <div className="col-span-12 md:col-span-4 row-span-1 bg-white rounded-xl overflow-hidden shadow-md">
              <Skeleton className="w-full h-[150px]" />
            </div>
            <div className="col-span-12 md:col-span-6 row-span-1 bg-white rounded-xl overflow-hidden shadow-md">
              <Skeleton className="w-full h-[150px]" />
            </div>
            <div className="col-span-12 md:col-span-6 row-span-1 bg-white rounded-xl overflow-hidden shadow-md">
              <Skeleton className="w-full h-[150px]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="topics" className="py-16 bg-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="uppercase text-sm tracking-wider text-accent font-medium">Browse by</span>
          <h2 className="font-heading text-3xl font-bold text-neutral-800">Voting Topics</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-800">
            Explore different aspects of responsible voting through our categorized content.
          </p>
        </motion.div>
        
        <motion.div 
          className="asymmetric-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Large Feature Item */}
          <motion.div 
            className="col-span-12 md:col-span-8 row-span-2 card-hover bg-white rounded-xl overflow-hidden shadow-md"
            variants={item}
          >
            <div className="h-full flex flex-col md:flex-row">
              <div className="md:w-1/2 h-64 md:h-auto bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                  alt="Electoral systems" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-secondary bg-opacity-20 text-secondary text-xs uppercase tracking-wider py-1 px-3 rounded-full mb-4">
                    Featured Topic
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4">Understanding Electoral Systems</h3>
                  <p className="text-neutral-800 mb-4">
                    From first-past-the-post to proportional representation, learn how different voting systems affect outcomes and representation.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-neutral-100 text-neutral-800 px-2 py-1 rounded">Electoral College</span>
                    <span className="text-xs bg-neutral-100 text-neutral-800 px-2 py-1 rounded">Popular Vote</span>
                    <span className="text-xs bg-neutral-100 text-neutral-800 px-2 py-1 rounded">Representation</span>
                  </div>
                </div>
                <Link href="/topic/electoral-systems">
                  <a className="text-primary font-medium text-sm hover:underline self-start">
                    Explore this topic →
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Medium Items */}
          <motion.div 
            className="col-span-12 md:col-span-4 row-span-1 card-hover bg-white rounded-xl overflow-hidden shadow-md"
            variants={item}
          >
            <div className="p-6">
              <div className="inline-block bg-accent bg-opacity-20 text-accent text-xs uppercase tracking-wider py-1 px-3 rounded-full mb-4">
                Civic Education
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">The Voting Process Explained</h3>
              <p className="text-neutral-800 text-sm mb-4">
                Step-by-step guides to registration, casting your ballot, and what happens after you vote.
              </p>
              <Link href="/topic/voting-process">
                <a className="text-primary font-medium text-sm hover:underline">
                  Read articles →
                </a>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-12 md:col-span-4 row-span-1 card-hover bg-white rounded-xl overflow-hidden shadow-md"
            variants={item}
          >
            <div className="p-6">
              <div className="inline-block bg-primary bg-opacity-20 text-primary text-xs uppercase tracking-wider py-1 px-3 rounded-full mb-4">
                Research
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Candidate Evaluation Tools</h3>
              <p className="text-neutral-800 text-sm mb-4">
                Frameworks and methods to assess candidates beyond party affiliations and campaign promises.
              </p>
              <Link href="/topic/candidate-evaluation">
                <a className="text-primary font-medium text-sm hover:underline">
                  Explore tools →
                </a>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-12 md:col-span-6 row-span-1 card-hover bg-white rounded-xl overflow-hidden shadow-md"
            variants={item}
          >
            <div className="h-full flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Policy analysis" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-secondary bg-opacity-20 text-secondary text-xs uppercase tracking-wider py-1 px-3 rounded-full mb-4">
                    Policy
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">Policy Analysis for Voters</h3>
                  <p className="text-neutral-800 text-sm mb-4">
                    How to understand complex policy proposals and their potential impacts.
                  </p>
                </div>
                <Link href="/topic/policy-analysis">
                  <a className="text-primary font-medium text-sm hover:underline self-start">
                    Learn more →
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-12 md:col-span-6 row-span-1 card-hover bg-white rounded-xl overflow-hidden shadow-md"
            variants={item}
          >
            <div className="h-full flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1591189824357-b2a4f0b4f980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                  alt="Voting rights" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-accent bg-opacity-20 text-accent text-xs uppercase tracking-wider py-1 px-3 rounded-full mb-4">
                    Rights
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">Voting Rights & Accessibility</h3>
                  <p className="text-neutral-800 text-sm mb-4">
                    Understanding barriers to voting and efforts to make democracy more inclusive.
                  </p>
                </div>
                <Link href="/topic/voting-rights">
                  <a className="text-primary font-medium text-sm hover:underline self-start">
                    Discover guides →
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
