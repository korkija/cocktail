import React from "react";
import ListCocktails from './ListCocktails';

function CategoriesCard({categories}) {
    return (
        <div className='list-cocktails'>
            {
                categories.map((item) => (
                    <div key={item.category}>
                        <div className='card-category'>
                            {item.category}
                        </div>
                        <ListCocktails listCategoriesCocktails={item.drinks}/>
                    </div>
                ))
            }

        </div>
    )
}
export default CategoriesCard;
