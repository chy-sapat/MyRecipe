import React, { useEffect, useState } from "react";
import { IoMdStarOutline, IoMdStarHalf, IoMdStar } from "react-icons/io";
import "@styles/starRating.scss";

const StarDisplay = ({ avgRating }) => {
  const [avgRatingStar, setAverageRatingStar] = useState(
    Array(5).fill([false, false])
  );

  useEffect(() => {
    const setStar = () => {
      let fullStars = Math.floor(avgRating);
      let halfStar = avgRating % fullStars;
      const temp = Array(5).fill([false, false]);
      temp.fill([true, true], 0, fullStars);
      halfStar && (temp[fullStars] = [true, false]);
      setAverageRatingStar(temp);
    };
    setStar();
  }, []);

  return (
    <section className="rating-stars">
      {avgRatingStar.map((star, index) => {
        return (
          <div key={index} className="star">
            {star[0] && star[1] && <IoMdStar size="25px" />}
            {star[0] && !star[1] && <IoMdStarHalf size="25px" />}
            {!star[0] && !star[1] && <IoMdStarOutline size="25px" />}
          </div>
        );
      })}
      <span>({avgRating.toFixed(1)})</span>
    </section>
  );
};

export default StarDisplay;
