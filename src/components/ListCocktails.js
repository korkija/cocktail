import React from "react";
import CocktailCard from './CocktailCard';

function ListCocktails({listCategoriesCocktails}) {
console.log('listCategoriesCocktails');
console.log(listCategoriesCocktails);
    return (
        <div className='list-cocktails'>
            {
                listCategoriesCocktails.map((item) => (
                        <CocktailCard cocktail={item}/>
                ))
            }

        </div>
    )
}

export default ListCocktails;
