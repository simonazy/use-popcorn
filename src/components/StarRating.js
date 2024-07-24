import Rating from "@mui/material/Rating";
import * as React from "react";

export default function StarRating() {
  const [value, setValue] = React.useState(2);
  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
}
