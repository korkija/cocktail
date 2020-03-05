import React from 'react';
import '../styles/App.css';
import 'antd/dist/antd.css';
import './styles/index.css';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import {
    getCategoriesList,
} from '../src/actions/cocktailsActions';
import Main from "../src/routs/index";

const {Footer} = Layout;

class App extends React.Component {

    componentDidMount() {
        this.props.getCategoriesList();
    }

    render() {
        return (
            <Layout style={{backgroundColor: 'white'}}>
                <div className='header-text'>
                    Cocktail BD
                    <img src="glass.png" style={{marginLeft: 40}} height="50" width="28" alt='cocktail'/>
                </div>
                <Layout>
                    <Main/>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    getCategoriesList,
};

export const
    AppContainer = connect(
        mapStateToProps,
        mapDispatchToProps
    )(App);

