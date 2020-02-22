import React from "react";
import ListCocktails from './ListCocktails';

function CategoriesCard({categories}) {
    categories.forEach((item,index)=>{
        console.log(index);
        console.log(item);
        console.log(item.category);
        console.log(item.drinks);
        console.log(Object.keys(item.toObject));
    });
    return (
        <div className='list-cocktails'>
            {
                categories.map((item) => (
                    <div key={item.strCategory}>
                        {item.strCategory}
                        <ListCocktails listCategoriesCocktails={item.drinks}/>
                    </div>
                ))
            }

        </div>
    )
}
export default CategoriesCard;
