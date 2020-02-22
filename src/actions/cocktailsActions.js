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


export const getCategoriesList = () => (dispatch) => {
    dispatch(getCategoriesListPending());
    axios.get(URL_CATEGORIES_COCKTAILS_LIST)
        .then(({data}) => {
            dispatch(getCategoriesListResolved((data.drinks)));
        })
        .catch((error) => {
            console.log(error);
            dispatch(getCategoriesListRejected());
        })
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

export const getListCocktailsFiltered = () => (dispatch, getState) => {
    dispatch(getListCocktailsFilteredPending());
    const {cocktails} = getState();
    const checkedFilters = cocktails.categoriesCocktailsFilteredList.filter((item)=>item.checked);
    let filteredList = [];
    filteredList = checkedFilters.map((item) => {
        const urlForGetOneListCocktails = URL_COCKTAILS_FILTER_LIST + item.strCategory;
        const objListFoCategory= {};
        axios.get(urlForGetOneListCocktails)
            .then(({data}) => {
                objListFoCategory.category=item.strCategory;
                objListFoCategory['category']=item.strCategory;
                objListFoCategory['drinks']=data.drinks;
                console.log(objListFoCategory.category);
            })
            .catch((error) => {
                console.log(error);
                dispatch(getListCocktailsFilteredRejected());
            });
        return objListFoCategory;

    });
    console.log('filteredList[0].category');
    console.log(filteredList[0].category);
    dispatch(getListCocktailsFilteredResolved(filteredList))
};
