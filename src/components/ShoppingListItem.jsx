import { useState } from "react";
import classes from "./ShoppingListItem.module.css";

export const ShoppingListItem = ({ item, handleRemoveItem }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex items-center p-2">
      <input
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        type="checkbox"
        className="mr-2"
      />
      <h3 className={`flex-1 ${isChecked ? "line-through" : ""}`}>{item}</h3>
      <button
        onClick={() => handleRemoveItem(item)}
        className={classes.removeButton}
      >
        x
      </button>
    </div>
  );
};
