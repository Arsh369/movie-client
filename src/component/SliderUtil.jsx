import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const PrevArrow = ({ onClick, className }) => {
  const isDisabled = className?.includes("slick-disabled");
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Previous movies"
      className={`absolute -left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-slate-200 shadow-lg shadow-black/50 backdrop-blur-md transition-all duration-200 hover:border-amber-500/60 hover:bg-slate-800 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 sm:-left-4 ${
        isDisabled
          ? "pointer-events-none opacity-0"
          : "opacity-90 hover:scale-105 hover:opacity-100"
      }`}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
};

const NextArrow = ({ onClick, className }) => {
  const isDisabled = className?.includes("slick-disabled");
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Next movies"
      className={`absolute -right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/90 text-slate-200 shadow-lg shadow-black/50 backdrop-blur-md transition-all duration-200 hover:border-amber-500/60 hover:bg-slate-800 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 sm:-right-4 ${
        isDisabled
          ? "pointer-events-none opacity-0"
          : "opacity-90 hover:scale-105 hover:opacity-100"
      }`}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
};

const SliderUtil = ({ data }) => {
  const movieCount = data?.length ?? 0;

  const settings = {
    dots: movieCount > 1,
    infinite: movieCount > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div>
        <ul className="mt-4 flex items-center justify-center gap-1.5">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button
        type="button"
        aria-label="Go to slide"
        className="h-2 w-2 rounded-full bg-slate-700 transition-all duration-200 hover:bg-slate-500 [.slick-active_&]:w-6 [.slick-active_&]:bg-amber-500"
      />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: movieCount > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: movieCount > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: movieCount > 1,
        },
      },
    ],
  };

  if (!data || movieCount === 0) {
    return null;
  }

  return (
    <div className="relative px-1 pb-6">
      <Slider {...settings}>
        {data.map((movie) => (
          <div key={movie._id} className="px-2.5 py-1">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderUtil;