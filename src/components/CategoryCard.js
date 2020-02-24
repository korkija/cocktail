import React from "react";
import ListCocktails from "./ListCocktails";

function CategoryCard({category}) {
    return (
        <div key={category.category}>
            <div className='card-category'>
                {category.category}
            </div>
            <ListCocktails listCategoriesCocktails={category.drinks}/>
        </div>
    )
}

export default CategoryCard;
