import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        url ? `${url}/api/food/list` : `/api/food/list`
      );

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch the food list: " + response.data.message);
      }
    } catch (error) {
      console.error("Error fetching the list: ", error);
      toast.error("An error occurred while fetching the list.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        url ? `${url}/api/food/remove` : `/api/food/remove`,
        { id: foodId }
      );
      await fetchList(); // Refresh the list after removing

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to remove food item: " + response.data.message);
      }
    } catch (error) {
      console.error("Error removing food item: ", error);
      toast.error("An error occurred while removing the food item.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url || ""}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          ))
        ) : (
          <p>No food items available.</p>
        )}
      </div>
    </div>
  );
};

List.propTypes = {
  url: PropTypes.string.isRequired,
};

export default List;
