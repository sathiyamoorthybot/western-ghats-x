import { Link } from "react-router-dom";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AuthButtons from "@/components/AuthButtons";
import { Menu, X } from "lucide-react"; // Lucide icons (hamburger and close)

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/lovable-uploads/446dd634-c297-4975-bb69-8470fc0b04ce.png"
                alt="Western Ghats X"
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/sbl" className={navigationMenuTriggerStyle()}>
                  SBL
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/kattanji-marathon" className={navigationMenuTriggerStyle()}>
                  Kattanji Hills Marathon
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={navigationMenuTriggerStyle()}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Authentication Buttons (Always visible) */}
          <div className="hidden md:block">
            <AuthButtons />
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 px-4 pb-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-white">
              Home
            </Link>
            <Link to="/sbl" onClick={() => setIsMobileMenuOpen(false)} className="block text-white">
              SBL
            </Link>
            <Link to="/kattanji-marathon" onClick={() => setIsMobileMenuOpen(false)} className="block text-white">
              Kattanji Hills Marathon
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-white">
              Contact
            </Link>
            <div className="pt-2">
              <AuthButtons />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
