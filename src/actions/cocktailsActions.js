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
    GET_NEXT_ITEM_CATEGORIES_PENDING,
    GET_NEXT_ITEM_CATEGORIES_RESOLVED,
    GET_NEXT_ITEM_CATEGORIES_REJECTED,
    SET_EMPTY_LIST_CATEGORIES,
    SET_FILTERS,
} from "../constantsAPP/constantsActions";

export const setFiltersClearListCategories = (newFilters) => async (dispatch, getState) => {
    dispatch(setFilters(newFilters));
    getState();
    dispatch(setEmptyListCategories());
    getState();
    dispatch(getNextItemListCocktailsFiltered());
};
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

const setEmptyListCategories = () => ({
    type: SET_EMPTY_LIST_CATEGORIES,
});

export const getCategoriesList = () => async (dispatch) => {
    dispatch(getCategoriesListPending());
    await axios.get(URL_CATEGORIES_COCKTAILS_LIST)
        .then(({data}) => {
            const resultCategoriesChecked = data.drinks.map((category) => ({
                'strCategory': category.strCategory,
                checked: true,
            }));
            dispatch(getCategoriesListResolved(resultCategoriesChecked));
        })
        .then(() => {
            dispatch(getNextItemListCocktailsFiltered());
            //dispatch(getListCocktailsFiltered()); // without page
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
const getNextItemListCocktailsFilteredPending = () => ({
    type: GET_NEXT_ITEM_CATEGORIES_PENDING
});

const getNextItemListCocktailsFilteredResolved = (nextListForChosenCategories) => {
    return {
        type: GET_NEXT_ITEM_CATEGORIES_RESOLVED,
        payLoad: {
            nextListForChosenCategories,
        }
    }
};

const getNextItemListCocktailsFilteredRejected = () => ({
    type: GET_NEXT_ITEM_CATEGORIES_REJECTED,
    payLoad: "Something wrong!"
});
export const getNextItemListCocktailsFiltered = () => async (dispatch, getState) => {
    const {cocktails} = getState();
    if (cocktails.cocktailsFiltered.length === 0) {
        dispatch(getNextItemListCocktailsFilteredPending());
    }
    const listCheckedCategories = cocktails.categoriesCocktailsFilteredList.filter((category) => category.checked === true);
    if (listCheckedCategories.length !== 0) {
        if (cocktails.cocktailsFiltered.length !== listCheckedCategories.length) {
            const nameNextCategory = listCheckedCategories[cocktails.cocktailsFiltered.length].strCategory;
            const urlForGetOneListCocktails = URL_COCKTAILS_FILTER_LIST + nameNextCategory;
            await axios.get(urlForGetOneListCocktails)
                .then(({data}) => {
                    const categoriesResults = {
                        category: nameNextCategory,
                        drinks: data.drinks,
                    };
                    dispatch(getNextItemListCocktailsFilteredResolved(categoriesResults));
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(getNextItemListCocktailsFilteredRejected());
                });
        }
    } else {
        dispatch(setEmptyListCategories());
    }
};
