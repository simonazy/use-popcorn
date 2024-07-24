import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import React from "react";

const labels = {
  0.5: "Awful",
  1: "Awful+",
  1.5: "Awful",
  2: "Awful+",
  2.5: "Awful",
  3: "Awful+",
  3.5: "Bad",
  4: "Bad+",
  4.5: "Bad",
  5: "Bad+",
  5.5: "Not Bad",
  6: "Bad",
  6.5: "Ok",
  7: "Ok+",
  7.5: "Ok",
  8: "Ok+",
  8.5: "Good",
  9: "Good+",
  9.5: "Excellent",
  10: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function StarRating({ userRating, setUserRating }) {
  const [hover, setHover] = React.useState(-1);

  return (
    <div>
      <Rating
        name="hover-feedback"
        value={userRating}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setUserRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        max={10}
      />{" "}
      {userRating !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : userRating]}</Box>
      )}
    </div>
  );
}
