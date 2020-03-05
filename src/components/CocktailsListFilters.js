import React from 'react';
import '../styles/App.css';
import 'antd/dist/antd.css';
import './styles/index.css';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import {
    getNextItemListCocktailsFiltered,
    setFiltersClearListCategories
} from '../actions/cocktailsActions';
import ListFilters from "./ListFilters";
import {CategoriesListContainer} from "./CategoriesList";

const {Sider, Content} = Layout;

class CocktailsListFilters extends React.Component {

    render() {
        return (
                <Layout>
                    <Sider className='sider' width='250px' style={{backgroundColor: 'white'}}>
                        {this.props.isLoadingCategories
                            ?
                            <div>
                                loading
                            </div>
                            :
                            <ListFilters
                                categoriesList={this.props.categoriesCocktailsAllList}
                                getCocktails={this.props.getNextItemListCocktailsFiltered}
                                setFilters={this.props.setFiltersClearListCategories}/>
                        }
                    </Sider>
                    <Content style={{backgroundColor: 'white'}}>
                        {this.props.isLoadingCocktailList
                            ?
                            <div className='loading'>
                                Loading
                            </div>
                            :
                            this.props.cocktailsFiltered.length !== 0
                                ?
                                <CategoriesListContainer categories={this.props.cocktailsFiltered}/>
                                :
                                <img src='https://i.gifer.com/7VE.gif' alt='Loading'/>
                        }
                    </Content>
                </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoadingCategories: state.cocktails.isLoadingCategories,
    isLoadingCocktailList: state.cocktails.isLoadingCocktailList,
    categoriesCocktailsFilteredList: state.cocktails.categoriesCocktailsFilteredList,
    categoriesCocktailsAllList: state.cocktails.categoriesCocktailsAllList,
    cocktailsFiltered: state.cocktails.cocktailsFiltered,
});

const mapDispatchToProps = {
    getNextItemListCocktailsFiltered,
    setFiltersClearListCategories,
};

export const
    CocktailsListFiltersContainer = connect(
        mapStateToProps,
        mapDispatchToProps
    )(CocktailsListFilters);
