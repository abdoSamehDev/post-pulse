import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
};

const MobileNavLink = ({ to, text }: Props): JSX.Element => (
  <Link
    to={to}
    className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md font-medium"
  >
    {text}
  </Link>
);

export default MobileNavLink;
