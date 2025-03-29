import { motion } from "framer-motion";
import { Link } from "wouter";

export default function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="rounded-2xl bg-neutral-800 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="uppercase text-sm tracking-wider text-accent font-medium">Our Mission</span>
              <h2 className="font-heading text-3xl font-bold text-white mt-2 mb-6">
                Why We Built This Platform
              </h2>
              <p className="text-white text-opacity-90 mb-6">
                Informed Citizen was created to combat misinformation and increase voter participation by providing accessible, factual resources that help citizens make informed choices at the ballot box.
              </p>
              <p className="text-white text-opacity-90 mb-8">
                Our team of journalists, civic educators, and political scientists is committed to nonpartisan, fact-based content that empowers voters of all backgrounds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <a className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-accent text-white hover:bg-opacity-90 transition-colors">
                    Meet Our Team
                  </a>
                </Link>
                <Link href="/about#methodology">
                  <a className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 transition-colors">
                    Our Methodology
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Team meeting" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-30"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
