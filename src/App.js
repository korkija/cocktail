import React from 'react';
import './styles/App.css';
import 'antd/dist/antd.css';
import './styles/index.css';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import {getListCocktailsFiltered, getCategoriesList, setFilters } from '../src/actions/cocktailsActions';
import ListFilters from "./components/ListFilters";
import CategoriesCard from "./components/CategoriesCard";

const {Header, Footer, Sider, Content} = Layout;

class App extends React.Component {

    componentDidMount() {
        this.props.getCategoriesList();
    }

    render() {
        console.log(this.props.isLoadingCategories);
        return (
            <Layout>
                <Header>
                    <div className='header-text'>
                        Header
                    </div>
                </Header>
                <Layout>
                    <Sider>
                        {this.props.isLoadingCategories
                            ?
                            <div>
                                loading
                            </div>
                            :
                                <ListFilters
                                    categoriesList={this.props.categoriesCocktailsAllList}
                                    getCocktails={this.props.getListCocktailsFiltered}
                                    setFilters={this.props.setFilters}/>
                        }

                    </Sider>
                    <Content>
                        {this.props.isLoadingCocktailList
                            ?
                            <div>
                                loading
                            </div>
                            :
                            <CategoriesCard categories={this.props.cocktailsFiltered}/>
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
    getCategoriesList,
    setFilters,
};


export const
    AppContainer = connect(
        mapStateToProps,
        mapDispatchToProps
    )(App);
