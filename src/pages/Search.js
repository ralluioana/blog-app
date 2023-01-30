import React from 'react'

export const Search = ({handleSearch,searchInput}) => {
  return (
    <div className="search">
    <input
      className="searchInput"
      type="text"
      placeholder="Search here..."
      onChange={handleSearch}
      value={searchInput}
    />
    <span className="searchIcon">
      <i className="fa fa-search"></i>
    </span>
  </div>
  )
}
