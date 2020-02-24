import React from 'react';
import './styles/App.css';
import 'antd/dist/antd.css';
import './styles/index.css';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import {
    getListCocktailsFiltered,
    getNextItemListCocktailsFiltered,
    getCategoriesList,
    setFiltersClearListCategories
} from '../src/actions/cocktailsActions';
import ListFilters from "./components/ListFilters";
import {CategoriesListContainer} from "./components/CategoriesList";

const {Footer, Sider, Content} = Layout;

class App extends React.Component {

    componentDidMount() {
        this.props.getCategoriesList();
    }

    render() {
        return (
            <Layout style={{backgroundColor: 'white'}}>
                <div className='header-text'>
                    Cocktail BD
                    <img src="glass.jpg" style={{marginLeft: 40}} height="50" width="28" alt='cocktail'/>
                </div>
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
                <Footer>Footer</Footer>
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
    getListCocktailsFiltered,
    getNextItemListCocktailsFiltered,
    getCategoriesList,
    setFiltersClearListCategories,
};

export const
    AppContainer = connect(
        mapStateToProps,
        mapDispatchToProps
    )(App);
