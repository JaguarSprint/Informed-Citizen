import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import TopicCategories from "@/components/home/TopicCategories";
import VotingResources from "@/components/home/VotingResources";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import AboutSection from "@/components/home/AboutSection";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <FeaturedArticles />
      <TopicCategories />
      <VotingResources />
      <NewsletterSignup />
      <AboutSection />
    </motion.div>
  );
}
