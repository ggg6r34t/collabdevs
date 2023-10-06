import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import PostItem from "../community/PostItem";
import UserItem from "../user/UserItem";

function SearchResult() {
  const postSearchResults = useSelector(
    (state: RootState) => state.posts.searchResults
  );
  const userSearchResults = useSelector(
    (state: RootState) => state.userList.searchResults
  );
  const searchType = useSelector((state: RootState) => state.posts.searchType);
  const isSearchActive = useSelector(
    (state: RootState) => state.posts.isSearchActive
  );

  return (
    <div className="px-2">
      <h2 className="text-xl font-semibold mb-2">Search result(s)</h2>
      {isSearchActive && (
        <div>
          {searchType === "post" && (
            <div>
              {postSearchResults.map((post) => (
                <div
                  key={post._id}
                  className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-4"
                >
                  <PostItem post={post} />
                </div>
              ))}
            </div>
          )}

          {searchType === "" && (
            <div>
              {userSearchResults.map((user) => (
                <div key={user._id} className="mb-2">
                  <UserItem user={user} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {userSearchResults.length === 0 || userSearchResults.length === 0 ? (
        <div className="text-gray-600">No search results found.</div>
      ) : null}
    </div>
  );
}

export default SearchResult;
