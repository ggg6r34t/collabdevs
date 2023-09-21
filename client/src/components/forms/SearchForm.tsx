import { useState } from "react";
import { useDispatch } from "react-redux";

import { postActions } from "../../redux/slices/post";

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    setErrorMessage("");
  }

  function handleSearch() {
    const trimmedQuery = searchQuery.trim();
    let searchType = "topic"; // default search

    if (trimmedQuery.startsWith("user:")) {
      searchType = "user";
    } else if (trimmedQuery.startsWith("topic:")) {
      searchType = "topic";
    } else {
      setErrorMessage("Please use 'user:' or 'topic:' prefix for your search.");
      return;
    }

    // remove the keyword from the query before dispatching
    const queryWithoutKeyword = trimmedQuery
      .slice(searchType.length + 1)
      .trim();

    dispatch(
      postActions.searchPost({ query: queryWithoutKeyword, type: searchType })
    );
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
      setSearchQuery("");
    }
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search topics with 'topic:' or users with 'user:'..."
        value={searchQuery}
        onChange={onChangeHandler}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 border rounded-md"
      />

      {errorMessage && <div className="text-red-500 mt-1">{errorMessage}</div>}
    </div>
  );
}

export default SearchForm;
