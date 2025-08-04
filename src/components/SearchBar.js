import React, { useState } from "react";
import { Radio } from "antd";
import { SEARCH_KEY } from "../constant";
import Search from "antd/lib/input/Search";

const SearchBar = (props) => {
  const [searchType, setSearchType] = useState(SEARCH_KEY.all);
  const [error, setError] = useState("");

  const changeSearchType = (e) => {
    const searchType = e.target.value;
    setSearchType(searchType);
    setError("");
    if (searchType === SEARCH_KEY.all) {
      props.handleSearch({ type: searchType, keyword: "" });
    }
  };

  const handleSearch = (value) => {
    if (searchType !== SEARCH_KEY.all && value === "") {
      setError("Please input search keyword");
      return;
    }
    setError("");
    props.handleSearch({ type: searchType, keyword: value });
  };

  return (
    <div className="search-bar">
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        disabled={searchType === SEARCH_KEY.all}
      />
      <p className="error-msg">{error}</p>
      <Radio.Group
        onChange={changeSearchType}
        value={searchType}
        className="search-type-groups"
      >
        <Radio value={SEARCH_KEY.all}>All</Radio>
        <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
        <Radio value={SEARCH_KEY.user}>User</Radio>
      </Radio.Group>
    </div>
  );
};

export default SearchBar;
