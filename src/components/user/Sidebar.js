import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaDollarSign, FaCogs, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", link: "/user/dashboard", icon: <FaTachometerAlt /> },
    { name: "Posts", link: "/user/posts", icon: <FaClipboardList /> },
    { name: "Subscriptions", link: "/user/subscriptions", icon: <FaDollarSign /> },
    { name: "Settings", link: "/user/settings", icon: <FaCogs /> },
    { name: "Logout", link: "/user/logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white shadow-md p-6 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto">
      <nav className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Menu</h2>
        <ul className="space-y-3">
          {menuItems.map((menu, index) => (
            <li key={index}>
              <Link
                to={menu.link}
                className={`flex items-center py-3 px-4 rounded-lg transition duration-300 ${
                  location.pathname === menu.link
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
              >
                <span className="text-lg mr-3">{menu.icon}</span>
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
