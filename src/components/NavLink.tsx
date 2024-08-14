import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  icon: ReactNode;
  text: string;
};

const NavLink = ({ to, icon, text }: Props): JSX.Element => (
  <Link
    to={to}
    className="text-white hover:bg-primary-dark px-3 py-2 rounded-md font-medium flex items-center transition duration-300"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
);

export default NavLink;
