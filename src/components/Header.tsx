import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import AuthButtons from "@/components/AuthButtons";
const Header = () => {
  return <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/446dd634-c297-4975-bb69-8470fc0b04ce.png" alt="Western Ghats X" className="h-14 w-auto" />
          </Link>

          {/* Navigation */}
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
                <Link to="/kattanji-marathon" className={navigationMenuTriggerStyle()}>Kattanji Hills Marathon</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={navigationMenuTriggerStyle()}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Authentication Buttons */}
          <AuthButtons />
        </div>
      </div>
    </header>;
};
export default Header;