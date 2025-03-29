import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/#featured", label: "Featured Articles" },
    { href: "/#topics", label: "Voting Topics" },
    { href: "/#resources", label: "Resources" },
    { href: "/#about", label: "About Us" },
  ];
  
  const resourceLinks = [
    { href: "#", label: "Voter Registration" },
    { href: "#", label: "Election Calendar" },
    { href: "#", label: "Research Guides" },
    { href: "#", label: "Media Literacy" },
    { href: "#", label: "Downloadable Tools" },
  ];
  
  const socialLinks = [
    { href: "#", icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { href: "#", icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
    { href: "#", icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
    { href: "#", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Social */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-primary font-bold text-lg">IC</span>
              </div>
              <span className="text-white font-bold text-xl">Informed Citizen</span>
            </div>
            <p className="text-white text-opacity-70 text-sm">
              Empowering voters through education, resources, and community.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  className="text-white text-opacity-70 hover:text-accent transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-white text-opacity-70 hover:text-accent transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white text-opacity-70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mt-1 mr-3 text-accent" />
                <span className="text-white text-opacity-70">contact@informedcitizen.org</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-accent" />
                <span className="text-white text-opacity-70">123 Democracy Ave, Capital City, SC 12345</span>
              </li>
            </ul>
            <div className="mt-6">
              <a 
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 border border-accent text-sm font-medium rounded-md text-accent hover:bg-accent hover:text-white transition-colors"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-white border-opacity-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-opacity-70 text-sm">
            © {currentYear} Informed Citizen. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-white text-opacity-70 text-sm hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-white text-opacity-70 text-sm hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="text-white text-opacity-70 text-sm hover:text-accent transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
