import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import SearchBar from "./searchBar";
import PostCard from "@components/Posts/postCard";

const SearchList = () => {
  const params = useParams();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchSearchedResult = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipe/search/${params.keyword}`
        );
        setSearchResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchedResult();
  }, []);
  return (
    <>
      <section className="search-result-container">
        <SearchBar />
        <section className="search-result">
          <h3>
            Search Result ({searchResult.length}) : {params.keyword}
          </h3>
          {searchResult.length == 0 ? (
            <section className="no-search-result">
              <p>No Result found</p>
            </section>
          ) : (
            <section className="search-list">
              <section className="posts">
                {searchResult.map((element) => {
                  return (
                    <section key={element._id} className="post-card">
                      <PostCard postInfo={element} />
                    </section>
                  );
                })}
              </section>
            </section>
          )}
        </section>
      </section>
    </>
  );
};

export default SearchList;
