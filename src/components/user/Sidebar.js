import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-64 bg-white shadow-md p-6 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto">
      <nav className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Menu</h2>
        <ul className="space-y-3">
          {[
            { name: "Dashboard", link: "/user/dashboard" },
            { name: "Posts", link: "/user/posts" },
            { name: "Subscriptions", link: "/user/subscriptions" },
            { name: "Settings", link: "/user/settings" },
            { name: "Logout", link: "/user/logout" },
          ].map((menu, index) => (
            <li key={index}>
              <Link
                to={menu.link}
                className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-blue-500 hover:text-white transition duration-300"
              >
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
