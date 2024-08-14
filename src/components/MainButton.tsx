import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  action?: () => void;
};

const MainButton = ({ children, action }: Props): JSX.Element => {
  return (
    <button
      className="bg-primary text-white hover:bg-opacity-90 px-4 py-2 rounded-md flex items-center transition duration-300 font-semibold"
      type="button"
      onClick={action}
    >
      {children}
    </button>
  );
};

export default MainButton;
