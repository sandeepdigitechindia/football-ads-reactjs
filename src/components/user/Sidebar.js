import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-6">User Dashboard</div>
      <ul>
        <li><Link to="/" className="block py-2 px-4 hover:bg-gray-600">Dashboard</Link></li>
        <li><Link to="/settings" className="block py-2 px-4 hover:bg-gray-600">Settings</Link></li>
        <li><Link to="/subscriptions" className="block py-2 px-4 hover:bg-gray-600">Subscriptions</Link></li>
        <li><Link to="/posts" className="block py-2 px-4 hover:bg-gray-600">Posts</Link></li>
        <li><Link to="/logout" className="block py-2 px-4 hover:bg-gray-600">Logout</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
