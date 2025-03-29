import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Miranda Chen",
      role: "Political Scientist & Editor",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      bio: "Dr. Chen specializes in electoral systems and voter behavior. She leads our team's research into voting methods and their impacts on representation."
    },
    {
      name: "James Washington",
      role: "Civic Educator",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      bio: "James brings 15 years of experience in civic education and community outreach, focusing on making complex voting information accessible to all."
    },
    {
      name: "Alisha Patel",
      role: "Journalist & Fact Checker",
      image: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      bio: "Alisha's background in investigative journalism ensures all content on Informed Citizen meets rigorous standards for accuracy and impartiality."
    },
    {
      name: "Marcus Freeman",
      role: "Data Analyst",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      bio: "Marcus analyzes voting trends and election data to provide evidence-based insights for our articles and resources."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <a className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Link>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl font-bold text-neutral-800 mb-4">About Informed Citizen</h1>
          <p className="text-lg text-neutral-800 max-w-3xl">
            Informed Citizen was created to combat misinformation and increase voter participation by providing accessible, 
            factual resources that help citizens make informed choices at the ballot box.
          </p>
        </motion.div>
        
        <div className="mb-16">
          <h2 className="font-heading text-3xl font-bold text-neutral-800 mb-6">Our Team</h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="card-hover bg-white rounded-lg overflow-hidden shadow-md"
                variants={item}
              >
                <div className="h-64 bg-neutral-200">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                  <p className="text-neutral-800 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          id="methodology"
          className="bg-white rounded-lg shadow-md p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-neutral-800 mb-6">Our Methodology</h2>
          
          <div className="prose prose-lg max-w-none text-neutral-800">
            <p>
              At Informed Citizen, we believe that a healthy democracy requires informed voters. Our content creation 
              process follows these principles:
            </p>
            
            <h3>Research & Fact-Finding</h3>
            <p>
              All content begins with comprehensive research using primary sources, academic research, and verified data. 
              We prioritize citation of original sources and consult with experts in relevant fields.
            </p>
            
            <h3>Nonpartisan Approach</h3>
            <p>
              We maintain strict nonpartisanship in all our materials. Content undergoes review by team members with 
              diverse political perspectives to ensure balanced presentation of information.
            </p>
            
            <h3>Accessibility</h3>
            <p>
              Complex information is presented in clear, concise language without oversimplification. We provide 
              multiple formats for diverse learning styles and ensure all digital content meets WCAG accessibility standards.
            </p>
            
            <h3>Transparency</h3>
            <p>
              We disclose our sources, methodologies, and any limitations in our analysis. We promptly acknowledge and 
              correct errors when identified.
            </p>
            
            <h3>Feedback & Improvement</h3>
            <p>
              We actively seek input from users, community leaders, and subject matter experts to continuously improve 
              our resources.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
