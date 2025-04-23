import React from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className="search-bar"
      placeholder="Filtrar pokemons por nombre"
      type="text"
      id="pkm-search"
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;