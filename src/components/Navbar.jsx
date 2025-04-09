import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          <Link to="/" className="text-white-500 underline">
            Home
          </Link>
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          <Link to="/album" className="text-white-500 underline">
            Album
          </Link>
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          <Link to="/navigation" className="text-white-500 underline">
            Navigation
          </Link>
        </button>
      </div>
    </nav>
  );
};
