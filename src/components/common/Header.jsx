import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My App</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/module1/courses" className="hover:underline">
              Courses
            </Link>
          </li>

          <li>
            <Link to="/module2/products" className="hover:underline">
              Products
            </Link>
          </li>
          <li>
            <Link to="/module2/categories" className="hover:underline">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/module3/projects" className="hover:underline">
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
