import React from 'react'

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Pesquisar..."
      value={searchTerm}
      onChange={setSearchTerm}
    />
  )
}

export default SearchBar
