import React from "react";
import ".././styles/Category/CategoryList.css";

const CategoryList = ({ categories, deleteCategory, editCategory }) => {
  return (
    <div className="category-list-container">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div key={index} className="category-list-item">
            <div className="category-list-info">
              <h3>{category.name}</h3>
              <p>
                Type: <strong>{category.type === "technical" ? "Technical" : "Non-Technical"}</strong>
              </p>
            </div>
            <div className="category-list-actions">
              <button className="category-list-edit-btn" onClick={() => editCategory(index)}>
                Edit
              </button>
              <button className="category-list-delete-btn" onClick={() => deleteCategory(index)}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="category-list-empty">No categories added yet.</p>
      )}
    </div>
  );
};

export default CategoryList;
