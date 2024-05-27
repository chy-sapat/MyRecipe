import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";
import "@styles/search.scss";

const SearchBar = () => {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = (e) => {
    // e.preventDefault();
    searchRef.current.value && navigate(`/search/${searchRef.current.value}`);
  };
  return (
    <>
      <section className="search-container">
        <section className="searchbar-wrapper">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              ref={searchRef}
              defaultValue={params.keyword ? params.keyword : null}
              // onFocus={() => setSearchActive(!searchActive)}
              // onBlur={() => setSearchActive(!searchActive)}
            />
          </form>
          <div className="search-icon">
            <IoIosSearch size="24px" />
          </div>
        </section>
        {/* <section
          className={`search-filter ${searchActive && "active"}`}
        ></section> */}
      </section>
    </>
  );
};

export default SearchBar;
