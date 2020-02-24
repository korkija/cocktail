import React from "react";
import CategoryCard from './CategoryCard';
import {getNextItemListCocktailsFiltered} from "../actions/cocktailsActions";
import {connect} from "react-redux";
import debounce from "lodash.debounce";

class CategoriesList extends React.Component {

    componentDidMount() {
        const scroll = document.querySelector('.list-categories');
        document.onscroll = debounce(() => {
            if (
                (window.innerHeight + document.documentElement.scrollTop)
                >= (document.documentElement.scrollHeight - 600)
            ) {
                this.fetchMoreData();
            }
        }, 50);
        if (scroll.scrollHeight <= window.screen.height) {
            this.fetchMoreData();
        }
    }

    fetchMoreData = () => {
        this.props.getNextItemListCocktailsFiltered();
    };

    render() {
        return (
            <div className='list-categories'>
                {
                    this.props.cocktailsFiltered.map((item) => (
                        <CategoryCard key={item.category} category={item}/>
                    ))
                }
                <a href="#"><img src="https://img.icons8.com/ios/100/000000/up.png" alt='UP'/></a>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoadingCocktailList: state.cocktails.isLoadingCocktailList,
    categoriesCocktailsFilteredList: state.cocktails.categoriesCocktailsFilteredList,
    cocktailsFiltered: state.cocktails.cocktailsFiltered,
});

const mapDispatchToProps = {
    getNextItemListCocktailsFiltered,
};

export const
    CategoriesListContainer = connect(
        mapStateToProps,
        mapDispatchToProps
    )(CategoriesList);

