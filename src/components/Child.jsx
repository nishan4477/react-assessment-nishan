const Child = ({counter,setCounter}) => {
  const handleMinusClick = () => {
    /* Implement logic here */
    setCounter((prev)=>prev-1)

  };

  const handlePlusClick = () => {
    /* Implement logic here */
    setCounter((prev)=>prev+1);
  };

  return (
    <div>
      <button type="button" className="btn" onClick={handleMinusClick}>
        -
      </button>
      <button type="button" className="btn" onClick={handlePlusClick}>
        +
      </button>
    </div>
  );
};

export default Child;
