/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ShowCarousel = ({ shows }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
  };

  return (
    <Slider {...settings}>
      {shows.map((show) => (
        <div className="showC" key={show.id}>
          <img src={show.image} alt={show.title} />
          <h3>{show.title}</h3>
          <p>Seasons: {show.seasons}</p>
          <p>Last Updated: {show.updated}</p>
        </div>
      ))}
    </Slider>
  );
};

export default ShowCarousel;
