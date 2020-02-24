import React from "react";
import CocktailCard from './CocktailCard';

function ListCocktails({listCategoriesCocktails}) {
    return (
        <div className='list-cocktails'>
            {
                listCategoriesCocktails.map((item) => (
                    <CocktailCard key={item.idDrink} cocktail={item}/>
                ))
            }
        </div>
    )
}

export default ListCocktails;
