import { useState } from "react";
import classes from "./ShoppingListItem.module.css";
import { useCounterStore } from "../store/store";

export const ShoppingListItem = ({ item, handleRemoveItem }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [increaseListCounter, decreaseListCounter] = useCounterStore(
    (state) => [state.increaseListCounter, state.decreaseListCounter]
  );

  function check() {
    if (isChecked) {
      decreaseListCounter();
    } else {
      increaseListCounter();
    }
    setIsChecked((prev) => !prev);
  }

  return (
    <div className="flex items-center p-2">
      <input
        checked={isChecked}
        onChange={() => check()}
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
