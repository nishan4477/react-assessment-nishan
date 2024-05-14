import classes from "./Album.module.css";

export const Album = ({ data }) => {
  return (
    <div className={classes.container}>
      <h2>Title: {data?.title} </h2>
    </div>
  );
};
