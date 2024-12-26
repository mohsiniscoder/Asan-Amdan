const FeaturedCategories = () => {
    const categories = [
      { name: "Web Development", icon: "🌐" },
      { name: "Graphic Design", icon: "🎨" },
      { name: "Content Writing", icon: "✍️" },
      { name: "Marketing", icon: "📈" },
    ];
  
    return (
      <section className="featured-categories">
        <h2>Explore Categories</h2>
        <div className="categories-container">
          {categories.map((cat, index) => (
            <div key={index} className="category-item">
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturedCategories;
  