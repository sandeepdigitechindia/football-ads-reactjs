const Logout = () => {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Logout</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium">Are you sure you want to logout?</h2>
          <p className="text-gray-700">If you're ready to log out, you can proceed.</p>
          <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Logout</button>
        </div>
      </div>
    );
  }
  
  export default Logout;
  