import React from "react";

function CocktailCard({cocktail}) {

    const showDetails = (idCocktail)=>{

    };

    return (
        <div className='card-cocktail' onClick={showDetails(cocktail.idDrink)}>
            <img className='img-card' src={cocktail.strDrinkThumb + '/preview'} alt={cocktail.strDrink}/>
            <div>
                <label>{cocktail.strDrink}</label>
            </div>
        </div>
    )
}

export default CocktailCard;
