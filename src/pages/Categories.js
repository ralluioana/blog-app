import React from 'react'

export const Categories = ({categories,handleSelectCategory,handleShowAll}) => {
  return (
    <div className="categoriesContainer">
        <h2>Categories</h2>
        {categories.map((category) => (
          <label
            className="categoryLabel"
            key={category}
            onClick={() => handleSelectCategory(category)}
          >
            {category}
          </label>
        ))}
        <label className="categoryLabel showAll" onClick={handleShowAll}>
          Show All
        </label>
      </div>
  )
}
