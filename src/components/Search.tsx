import React, { useState } from 'react';
import Button from './Button';

interface SearchProps {
  onSearch: (searchQuery: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('');
  };

  return (
    <form
      className="form-inline"
      onSubmit={handleSearchClick}
    >
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="SEARCH BLOG"
        name="search"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button buttonStyle={'btn btn-success my-2 my-sm-4'} type="submit">
        SEARCH
      </Button>
    </form>
  );
};

export default Search;
