/* eslint-disable no-undef */
import { useEffect, useState, useCallback } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Search from "./Search";
import { createClient } from "@supabase/supabase-js";
import unfavouriteImage from "../assets/unFavButton.svg";
import favouriteImage from "../assets/favImg.svg";
//import ShowCarousel from "./ShowCarousel";

const apiKey = process.env.SUPA_BASE_API_KEY;
const ProApi = process.env.SUPA_BASE_PROJECT_URL;

const supabase = createClient(ProApi, apiKey);

const genreMap = {
  1: "Personal Growth",
  2: "True Crime and Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "news",
  9: "Kids and Family",
};

export default function FrontPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [sortByDateAsc, setSortByDateAsc] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [FavIds, setFavIds] = useState([]);
  const [, setFavourites] = useState();

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((shows) => {
        setData(shows);
        setFilteredData(shows);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
    getFavourites();
  }, []);

  const formateDate = (date) => {
    const dateAsDateTime = new Date(date);
    const formattedDate = dateAsDateTime.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };
  const convertGenre = (genres) => {
    const convertedGenres = genres.map((item) => genreMap[item]);

    return convertedGenres.join(", ");
  };

  const handleAscSort = () => {
    // Sort Data Alphabetically by Title(A to Z )
    const sortedData = data.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleAscSort1 = () => {
    // Sort Data Alphabetically by Title (Z to A)
    const sortedData = data.sort((a, b) => {
      if (b.title < a.title) {
        return -1;
      }
      if (b.title > a.title) {
        return 0;
      }
      return 1;
    });
    setData(sortedData);
  };

  const handleDateAscSort = () => {
    const sortedData = data.sort((a, b) => {
      return new Date(a.updated) - new Date(b.updated);
    });
    setData(sortedData);
    setSortByDateAsc(true);
  };

  const handleDateDescSort = () => {
    const sortedData = data.sort((a, b) => {
      return new Date(b.updated) - new Date(a.updated);
    });
    setData(sortedData);
    setSortByDateAsc(false);
  };

  const handleInputChange = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(data);
    }

    const filteredData = data.filter((show) => {
      if (show.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return show;
      }
      if (show.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return show;
      }
    });

    setFilteredData(filteredData);
  };

  const getFavourites = async () => {
    const { data } = await supabase.from("favourites").select();

    setFavIds(data[0].favouriteids);
    console.log(FavIds);
  };

  const handleSetFavourites = () => {
    const filteredFavourites = data.filter((show) => FavIds.includes(show.id));
    setFavourites(filteredFavourites);
  };

  useEffect(() => {
    handleSetFavourites();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FavIds]);

  const updateFavourites = async (favIds) => {
    const { error } = await supabase
      .from("favourites")
      .update({ favouriteids: favIds })
      .eq("id", 1);

    if (error) {
      console.error("AWE ERROR BRU", error);
      return;
    }
  };

  const markFavourite = async (showId) => {
    const isFavourited = FavIds.includes(showId);
    const favouriteIdClone = [...FavIds];

    if (!isFavourited) {
      favouriteIdClone.push(showId);
    } else {
      const foundFavouriteIndex = favouriteIdClone.findIndex(
        (id) => id === showId
      );
      if (foundFavouriteIndex !== -1) {
        favouriteIdClone.splice(foundFavouriteIndex, 1);
      }
    }

    //Update table with new clone
    await updateFavourites(favouriteIdClone);
    await getFavourites();
  };

  const handleFavouritePage = (favourites) => {
    navigate("./Fav", { state: favourites });
  };

  return (
    <div>
      <NavBar
        onButtonClick={() => {
          handleAscSort();
          forceUpdate();
        }}
        onButtonClick1={() => {
          handleAscSort1();
          forceUpdate();
        }}
        onButtonClick2={() => {
          if (sortByDateAsc) {
            handleDateDescSort();
          } else {
            handleDateAscSort();
          }
          forceUpdate();
        }}
        onButtonClick3={() => {
          handleFavouritePage();
          forceUpdate();
        }}
      />
      <Search handleInputChange={(e) => handleInputChange(e)} />
      <div className="info">
        {loading ? ( // Display loading state if data is being fetched
          <p className="load">Loading...</p>
        ) : (
          <>
            {filteredData.length > 0 ? (
              filteredData.map((show) => (
                <div key={show.id} className="episode">
                  <img src={show.image} alt={show.title} />
                  <div className="episode-details">
                    <h3>{show.title}</h3>
                    <p>Seasons: {show.seasons}</p>
                    <p>Genres: {convertGenre(show.genres)}</p>
                    <p>Last Updated: {formateDate(show.updated)}</p>
                    <Link to={`Episode/${show.id}`} key={show.id}>
                      Listen
                    </Link>
                  </div>
                  <img
                    className="favourite-image"
                    src={
                      FavIds.includes(show.id)
                        ? unfavouriteImage
                        : favouriteImage
                    }
                    alt=""
                    onClick={() => markFavourite(show.id)}
                  />
                </div>
              ))
            ) : (
              <div>No Results</div>
            )}
          </>
        )}
      </div>
      {/* <ShowCarousel shows={data} /> */}
    </div>
  );
}
