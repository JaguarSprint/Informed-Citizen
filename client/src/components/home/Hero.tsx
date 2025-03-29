import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative h-[80vh] overflow-hidden bg-primary flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary opacity-80"></div>
        <img 
          src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Voting scene" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="md:w-3/5">
          <motion.h1 
            className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight"
            variants={itemVariants}
          >
            Become a <span className="text-accent">Responsible</span> Voter
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-white font-light max-w-2xl"
            variants={itemVariants}
          >
            Democracy thrives when citizens are informed. Explore our resources to make your vote count with knowledge and purpose.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <Link href="#featured">
              <a className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-accent text-white hover:bg-opacity-90 transition-colors">
                Start Learning
              </a>
            </Link>
            <Link href="#resources">
              <a className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 transition-colors">
                Get Resources
              </a>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
