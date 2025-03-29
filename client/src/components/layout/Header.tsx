import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/#featured", label: "Featured" },
  { href: "/#topics", label: "Topics" },
  { href: "/#resources", label: "Resources" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling for anchor links when on homepage
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply smooth scrolling behavior on the homepage
    if (location === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/", "");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: "smooth",
        });
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would navigate to search results
    console.log("Search for:", searchValue);
    setIsSearchOpen(false);
    setSearchValue("");
  };

  return (
    <header 
      className={`fixed w-full bg-white bg-opacity-95 backdrop-blur-sm z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <motion.div 
                className="h-10 w-10 rounded-full bg-primary flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-medium text-lg">IC</span>
              </motion.div>
              <span className="text-neutral-800 font-bold text-xl">Informed Citizen</span>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a 
                  className="nav-link group flex flex-col items-center"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="font-medium text-sm tracking-wide text-neutral-800 pb-1">
                    {link.label}
                  </span>
                  <motion.div 
                    className="nav-indicator h-0.5 w-1/4 bg-accent"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center" aria-label="Open menu">
                  <Menu className="h-6 w-6 text-neutral-800" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                <div className="flex flex-col h-full py-6">
                  <div className="mb-8 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-3">
                      <span className="text-white font-medium text-lg">IC</span>
                    </div>
                    <span className="text-neutral-800 font-bold text-xl">Informed Citizen</span>
                  </div>
                  <nav className="flex flex-col space-y-6">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link href={link.href}>
                          <a 
                            className="text-lg font-medium text-neutral-800 border-b border-neutral-200 pb-2"
                            onClick={(e) => handleNavClick(e, link.href)}
                          >
                            {link.label}
                          </a>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto">
                    <SheetClose asChild>
                      <Link href="/#newsletter">
                        <a className="inline-flex items-center justify-center px-4 py-2 w-full border border-transparent rounded-md bg-primary text-white hover:bg-opacity-90 transition-colors">
                          Subscribe
                        </a>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Search Button */}
          <div className="hidden md:flex items-center ml-8">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <button 
                  className="flex items-center text-neutral-800 hover:text-accent transition-colors" 
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-grow"
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Search
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
