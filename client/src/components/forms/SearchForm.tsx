import { useState } from "react";
import { useDispatch } from "react-redux";
import DOMPurify from "dompurify";

import { postActions } from "../../redux/slices/post";
import { usersActions } from "../../redux/slices/users"; // Import the users slice

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  function sanitizeInput(input: string) {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [], // Remove all HTML tags
    });
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = sanitizeInput(event.target.value);
    setSearchQuery(newQuery);
    setErrorMessage("");
    if (newQuery.trim() === "") {
      dispatch(postActions.setIsSearchActive(false));
    }
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

    if (searchType === "user") {
      // Dispatch the searchUser action for user search
      dispatch(
        usersActions.searchUser({
          query: queryWithoutKeyword,
          type: searchType,
        })
      );
    } else {
      // Dispatch the searchPost action for topic search
      dispatch(
        postActions.searchPost({ query: queryWithoutKeyword, type: searchType })
      );
    }

    dispatch(postActions.setIsSearchActive(true)); // true when a search is active
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    } else if (event.key === "Backspace" && searchQuery === "") {
      dispatch(postActions.setIsSearchActive(false));
      dispatch(postActions.resetSearchResults());
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
        className="w-full dark:bg-slate-800 dark:text-white px-2 py-1 border rounded-md"
      />

      {errorMessage && <div className="text-red-500 mt-1">{errorMessage}</div>}
    </div>
  );
}

export default SearchForm;
