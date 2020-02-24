import {
    GET_CATEGORIES_LIST_PENDING,
    GET_CATEGORIES_LIST_REJECTED,
    GET_CATEGORIES_LIST_RESOLVED,
    GET_LIST_COCKTAILS_FILTERED_PENDING,
    GET_LIST_COCKTAILS_FILTERED_RESOLVED,
    GET_LIST_COCKTAILS_FILTERED_REJECTED,
    SET_FILTERS,
    GET_NEXT_ITEM_CATEGORIES_PENDING,
    GET_NEXT_ITEM_CATEGORIES_RESOLVED,
    GET_NEXT_ITEM_CATEGORIES_REJECTED,
    SET_EMPTY_LIST_CATEGORIES,
} from "../constantsAPP/constantsActions";

const INITIAL_DATA = {
    isLoadingCategories: true,
    isLoadingCocktailList: true,
    categoriesCocktailsFilteredList: [],
    categoriesCocktailsAllList: [],
    cocktailsFiltered: [],
};

export const cocktails = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case SET_FILTERS: {
            return {
                ...state,
                categoriesCocktailsFilteredList: action.payLoad.newFilters,
            };
        }
        case GET_CATEGORIES_LIST_PENDING: {
            return {
                ...state,
                isLoadingCategories: true,
                errorMsg: ""
            };
        }
        case GET_CATEGORIES_LIST_RESOLVED: {
            return {
                ...state,
                isLoadingCategories: false,
                categoriesCocktailsAllList: action.payLoad.categoriesCocktailsAllList,
                categoriesCocktailsFilteredList: action.payLoad.categoriesCocktailsAllList,
            };
        }
        case GET_CATEGORIES_LIST_REJECTED: {
            return {
                ...state,
                isLoadingCategories: false,
                errorMsg: action.payLoad
            };
        }
        case GET_LIST_COCKTAILS_FILTERED_PENDING: {
            return {
                ...state,
                isLoadingCocktailList: true,
                errorMsg: ""
            };
        }
        case GET_LIST_COCKTAILS_FILTERED_RESOLVED: {
            return {
                ...state,
                isLoadingCocktailList: false,
                cocktailsFiltered: action.payLoad.cocktailsListForChosenCategories,
            };
        }
        case GET_LIST_COCKTAILS_FILTERED_REJECTED: {
            return {
                ...state,
                isLoadingCocktailList: false,
                errorMsg: action.payLoad
            };
        }
        case GET_NEXT_ITEM_CATEGORIES_PENDING: {
            return {
                ...state,
                isLoadingCocktailList: true,
                errorMsg: ""
            };
        }
        case GET_NEXT_ITEM_CATEGORIES_RESOLVED: {
            console.log(action.payLoad.nextListForChosenCategories);
            console.log([...state.cocktailsFiltered, action.payLoad.nextListForChosenCategories]);
            return {
                ...state,
                isLoadingCocktailList: false,
                cocktailsFiltered: [...state.cocktailsFiltered, action.payLoad.nextListForChosenCategories],
            };
        }
        case GET_NEXT_ITEM_CATEGORIES_REJECTED: {
            return {
                ...state,
                isLoadingCocktailList: false,
                errorMsg: action.payLoad
            };
        }
        case SET_EMPTY_LIST_CATEGORIES: {
            return {
                ...state,
                isLoadingCocktailList: false,
                cocktailsFiltered: []
            };
        }
        default: {
            return state;
        }
    }
};
