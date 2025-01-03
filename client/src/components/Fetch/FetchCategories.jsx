import axios from "axios";

const fetchCategories = async () => {
  try {
    const response = await axios.get("https://asan-amdan-py4u.vercel.app/api/v1/categories/getAllCategories");
    return response.data.categories;  // Return categories directly
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data?.msg || error.message);
    return [];  // Return an empty array in case of error
  }
};

export default fetchCategories;
