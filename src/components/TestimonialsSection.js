import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'John Doe',
      photo: '/testimonial/man.png', // Replace with actual photo path
      quote: 'Football Ads helped me connect with the best clubs for my career! Highly recommend it!',
      rating: 5, // Rating out of 5
    },
    {
      name: 'Jane Smith',
      photo: '/testimonial/man.png', // Replace with actual photo path
      quote: 'A fantastic platform! I was able to promote my services and reach more people.',
      rating: 4, // Rating out of 5
    },
    {
      name: 'Michael Brown',
      photo: '/testimonial/man.png', // Replace with actual photo path
      quote: 'The best experience I’ve had. Easy to use, and the results speak for themselves!',
      rating: 5, // Rating out of 5
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">What Our Clients Say</h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <p className="text-gray-700 mb-4">{testimonial.quote}</p>

              {/* Ratings */}
              <div className="flex justify-center items-center">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 ${starIndex < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.27l-6.18 3.24 1.64-7.03L1 6.89l7.19-.61L10 0l2.81 5.28 7.19.61-4.46 4.59 1.64 7.03L10 15.27z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>

              <h3 className="text-lg font-semibold mt-4">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
