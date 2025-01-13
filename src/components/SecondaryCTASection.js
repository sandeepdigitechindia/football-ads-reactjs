import React from 'react';

const SecondaryCTASection = () => {
  return (
    <section className="bg-gray-800 text-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Stay Connected!</h2>
        
        {/* Newsletter Subscription */}
        <div className="mb-8">
          <p className="text-xl mb-4">Subscribe to our newsletter for updates and exclusive promotions!</p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 text-black rounded-l-lg w-1/2"
            />
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-r-lg">
              Subscribe
            </button>
          </form>
        </div>

        
      </div>
    </section>
  );
};

export default SecondaryCTASection;
