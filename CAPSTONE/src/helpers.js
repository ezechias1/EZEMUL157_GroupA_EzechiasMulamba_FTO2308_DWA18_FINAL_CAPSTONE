/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";
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

const apiKey = process.env.SUPA_BASE_API_KEY;
const ProApi = process.env.SUPA_BASE_PROJECT_URL;

const supabase = createClient(ProApi, apiKey);

export const getFavourites = async () => {
  const { data } = await supabase.from("favourites").select();
  console.log(data);
  return data;
};

export const formateDate = (date) => {
  const dateAsDateTime = new Date(date);
  const formattedDate = dateAsDateTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
};
export const convertGenre = (genres) => {
  const convertedGenres = genres.map((item) => genreMap[item]);

  return convertedGenres.join(", ");
};
export const handleAscSort = () => {
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

export const handleAscSort1 = () => {
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

export const handleDateAscSort = () => {
  const sortedData = data.sort((a, b) => {
    return new Date(a.updated) - new Date(b.updated);
  });
  setData(sortedData);
  setSortByDateAsc(true);
};

export const handleDateDescSort = () => {
  const sortedData = data.sort((a, b) => {
    return new Date(b.updated) - new Date(a.updated);
  });
  setData(sortedData);
  setSortByDateAsc(false);
};
