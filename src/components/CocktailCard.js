import React from "react";

function CocktailCard({cocktail}) {

    return (
        <div key={cocktail.idDrink}>
            <label>{cocktail.strDrink}</label>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
        </div>
    )
}

export default CocktailCard;
