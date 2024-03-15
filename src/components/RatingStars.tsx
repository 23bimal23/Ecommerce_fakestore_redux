import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

type rateType = {
  rate: number;
};

const RatingStars = ({ rate }: rateType) => {
  const filledStar = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
  const emptyStar = 5 - filledStar - (hasHalfStar ? 1 : 0);

  return (
    <div>
      {[...Array(filledStar)].map((_, index) => (
        <StarIcon key={index} style={{ color: "#ffe234" }} />
      ))}
      {hasHalfStar && <StarHalfIcon key="half" style={{ color: "#ffe234" }} />}
      {[...Array(emptyStar)].map((_, index) => (
        <StarBorderIcon key={index} style={{ color: "#ffe234" }} />
      ))}
    </div>
  );
};

export default RatingStars;
