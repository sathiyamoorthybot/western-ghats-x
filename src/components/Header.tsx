import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import AuthButtons from "@/components/AuthButtons";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/446dd634-c297-4975-bb69-8470fc0b04ce.png"
              alt="Western Ghats X"
              className="h-14 w-auto"
            />
          </Link>

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
                <Link to="/kattanji-hills-marathon" className={navigationMenuTriggerStyle()}>
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

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mountain-green"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-mountain-green hover:bg-mountain-green/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/sbl"
              className="block px-3 py-2 rounded-md text-base font-medium text-mountain-green hover:bg-mountain-green/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              SBL
            </Link>
            <Link
              to="/kattanji-hills-marathon"
              className="block px-3 py-2 rounded-md text-base font-medium text-mountain-green hover:bg-mountain-green/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kattanji Hills Marathon
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-mountain-green hover:bg-mountain-green/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {/* Optional: Auth Buttons on mobile */}
            <div className="mt-2 border-t border-gray-200 pt-2">
              <AuthButtons />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
