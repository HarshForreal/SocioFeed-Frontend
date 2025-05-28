import Button from "../common/Button/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full px-6 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left section: logo + text */}
        <div className="flex items-center space-x-2 min-w-0">
          <span className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Sociofeed Logo"
              style={{ height: "35px", width: "35px" }}
            />
          </span>
          {/* Show text only on sm and above */}
          <span
            className="hidden sm:inline text-xl font-semibold text-gray-900"
            style={{
              fontFamily: "instrument-serif, sans-serif",
              fontStyle: "normal",
              fontSize: "24px",
              whiteSpace: "nowrap",
            }}
          >
            Sociofeed
          </span>
        </div>

        {/* Right section: buttons */}
        <div className="flex items-center space-x-3">
          <Button
            text="Log in"
            color="bg-white"
            textColor="text-black border border-gray-300 hover:border-black"
            className="rounded-full text-sm font-medium px-4 py-1.5"
            onClick={() => {
              navigate("/login");
            }}
          />
          <Button
            text="Create Profile"
            color="bg-green-600"
            textColor="text-white"
            className="rounded-full text-sm font-semibold px-5 py-1.5"
            onClick={() => {
              navigate("/signup");
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
