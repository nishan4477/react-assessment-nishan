import React, { useState } from "react";
import "./App.css";
import { ShoppingListItem } from "./components/ShoppingListItem";

function App() {
  const [newItem, setNewItem] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  function handleAddItem(value) {
    if (!Boolean(value)) {
      alert("Please enter the item before adding");
    } else {
      const isPresent = shoppingList?.findIndex((i) => i === value);
      if (isPresent !== -1) {
        alert("Item already present in the list");
      } else {
        setShoppingList((prev) => [...prev, value]);
      }
      setNewItem("");
    }
  }

  function handleRemoveItem(item) {
    setShoppingList(shoppingList?.filter((i) => i !== item));
  }

  return (
    <div className="container">
      <h1 className="mb-4">My Shopping List</h1>

      <div className="flex gap-4 pb-3 border-b-2 border-gray-700">
        <input
          type="text"
          placeholder="E.g. Carrots"
          className="v__input flex-1"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
        />
        <button className="v__button" onClick={() => handleAddItem(newItem)}>
          Add
        </button>
      </div>
      <div className="v__list-container overflow-y-scroll">
        {shoppingList?.length > 0 &&
          shoppingList?.map((item, index) => (
            <ShoppingListItem
              key={index}
              item={item}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
