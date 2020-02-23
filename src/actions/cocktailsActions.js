import axios from "axios";
import {
    URL_CATEGORIES_COCKTAILS_LIST,
    URL_COCKTAILS_FILTER_LIST,
} from "../constantsAPP/appConfig";
import {
    GET_CATEGORIES_LIST_PENDING,
    GET_CATEGORIES_LIST_REJECTED,
    GET_CATEGORIES_LIST_RESOLVED,
    GET_LIST_COCKTAILS_FILTERED_PENDING,
    GET_LIST_COCKTAILS_FILTERED_RESOLVED,
    GET_LIST_COCKTAILS_FILTERED_REJECTED,
    SET_FILTERS,
} from "../constantsAPP/constantsActions";

export const setFilters = (newFilters) => ({
    type: SET_FILTERS,
    payLoad: {
        newFilters
    }
});
const getCategoriesListPending = () => ({
    type: GET_CATEGORIES_LIST_PENDING
});

const getCategoriesListResolved = (categoriesCocktailsAllList) => ({
    type: GET_CATEGORIES_LIST_RESOLVED,
    payLoad: {
        categoriesCocktailsAllList
    }
});

const getCategoriesListRejected = () => ({
    type: GET_CATEGORIES_LIST_REJECTED,
    payLoad: "Something wrong!"
});

export const getCategoriesList = () => async (dispatch) => {
    dispatch(getCategoriesListPending());
    await axios.get(URL_CATEGORIES_COCKTAILS_LIST)
        .then(({data}) => {
            const resultCategoriesChecked = data.drinks.map((category)=>({
                'strCategory': category.strCategory,
                checked: true,
            }));
            dispatch(getCategoriesListResolved(resultCategoriesChecked));
        })
        .then(()=>{
            dispatch(getListCocktailsFiltered());
        })
        .catch((error) => {
            console.log(error);
            dispatch(getCategoriesListRejected());
        });

};
const getListCocktailsFilteredPending = () => ({
    type: GET_LIST_COCKTAILS_FILTERED_PENDING
});

const getListCocktailsFilteredResolved = (cocktailsListForChosenCategories) => ({
    type: GET_LIST_COCKTAILS_FILTERED_RESOLVED,
    payLoad: {
        cocktailsListForChosenCategories
    }
});

const getListCocktailsFilteredRejected = () => ({
    type: GET_LIST_COCKTAILS_FILTERED_REJECTED,
    payLoad: "Something wrong!"
});

export const getListCocktailsFiltered = () => async (dispatch, getState) => {
    dispatch(getListCocktailsFilteredPending());
    const {cocktails} = getState();

    const checkedFilters = cocktails.categoriesCocktailsFilteredList.filter((item) => item.checked);
    try {
        // const results = [];
        // for (let i = 0; i < checkedFilters.length; i++) {
        //     const urlForGetOneListCocktails = URL_COCKTAILS_FILTER_LIST + checkedFilters[i].strCategory;
        //     try {
        //         const result = await axios.get(urlForGetOneListCocktails);
        //         results.push(result);
        //     } catch (e) {
        //     }
        // }
        //result = [...prev, ...new]
        const results = await Promise.all(checkedFilters.map(({strCategory}) => {
            const urlForGetOneListCocktails = URL_COCKTAILS_FILTER_LIST + strCategory;
            return axios.get(urlForGetOneListCocktails);
        }));
        const categoriesResults = checkedFilters.map(({strCategory}, i) => ({
            category: strCategory,
            drinks: results[i].data.drinks,
        }));

        dispatch(getListCocktailsFilteredResolved(categoriesResults))
    } catch (e) {
        console.log(e);
        dispatch(getListCocktailsFilteredRejected());
    }
};
