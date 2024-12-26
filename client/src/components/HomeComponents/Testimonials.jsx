const Testimonials = () => {
    const testimonials = [
      { quote: "This platform changed my life!", author: "John Doe" },
      { quote: "Amazing service and support!", author: "Jane Smith" },
      { quote: "Highly recommend to everyone.", author: "Ali Khan" },
    ];
  
    return (
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-container">
          {testimonials.map((test, index) => (
            <div key={index} className="testimonial-item">
              <p>"{test.quote}"</p>
              <h4>- {test.author}</h4>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  