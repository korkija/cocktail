import React from "react";

function CocktailCard({cocktail}) {

    return (
        <div className='card-cocktail'>
            <img className='img-card' src={cocktail.strDrinkThumb + '/preview'} alt={cocktail.strDrink}/>
            <div>
                <label>{cocktail.strDrink}</label>
            </div>
        </div>
    )
}

export default CocktailCard;
