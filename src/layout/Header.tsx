import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import Logo from "../assets/logo.png";
import MobileNavLink from "../components/MobileNavLink";
import SecondaryButton from "../components/SecondaryButton";

const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary shadow-lg">
      <div className="w-5/6 mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* LOGO */}
          <Link to="/">
            <img src={Logo} alt="logo" className="w-10 h-10" />
          </Link>
          {/* Navs and Add Post Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/add-post">
              <SecondaryButton>
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Post
              </SecondaryButton>
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white "
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="p-3 space-y-1">
            <MobileNavLink to="/" text="Home" />
            <MobileNavLink to="/profile" text="Profile" />
            <MobileNavLink to="/add-post" text="Add Post" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
