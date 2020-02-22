import React, {useState, useEffect} from "react";

function ListFilters({categoriesList, getCocktails, setFilters}) {

    const checkedCategoriesDefault = categoriesList.map((item) => (
        {
            'strCategory': item.strCategory,
            checked: true,
        }
    ));

    const [checkedCategories, setCheckedCategories] = useState(checkedCategoriesDefault);

    useEffect(() => {
        // action on update of movies
    }, [checkedCategories]);

    const handleChange = (e) => {
        setCheckedCategories(
            checkedCategories.map((item) =>{
                return  item.strCategory !== e.target.id
                    ?item
                    :{
                        'strCategory': item.strCategory,
                        checked:!item.checked,
                    }
            }));
    };

    const setNewFilters = () => {
        setFilters(checkedCategories);
        getCocktails();
    };

    return (
        <div>
            {checkedCategories.map((item) => (
                <div key={item.strCategory}>
                    <input type="checkbox"
                           id={item.strCategory}
                           name={item.strCategory}
                           checked={item.checked}
                           onChange={handleChange}/>
                    <label htmlFor="scales">{item.strCategory}</label>
                </div>
            ))}
            <p><input type="submit" value="APPLY" onClick={setNewFilters}/></p>
        </div>
    )
}

export default ListFilters;