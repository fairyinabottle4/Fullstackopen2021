import React from "react";
import Dropdown from "./Dropdown";
import Searchbar from "./Searchbar";

const RepositoryListHeader = ({
  searchQuery,
  onChangeSearch,
  onPress,
  sort,
}) => (
  <>
    <Searchbar searchQuery={searchQuery} onChangeSearch={onChangeSearch} />
    <Dropdown onPress={onPress} sort={sort} />
  </>
);

export default RepositoryListHeader;
