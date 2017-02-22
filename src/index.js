import React, { Component, PropTypes } from 'react';

import { render } from 'react-dom'
import styles from './styles/main.scss'

import Header from './components/common/Header'
import Footer from './components/common/Footer'
import CartItem from './components/CartItem'
import App from './containers/App'

import { productsData } from './data/data'

import rootReducer from './reducers/index'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import ThemeProvider from './containers/ThemeProvider'

import { en } from './locales/en';
import { fr } from './locales/fr';

const locales = {en, fr};

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const defaultState = {
	products: productsData.products,
	cartProducts: []
}

const store = createStore(rootReducer, defaultState, applyMiddleware(...middleware))

class ShoppingCart extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentLanguage: fr
		};
	}

	changeLanguage(locale) {
		this.setState({ currentLanguage: locale})
	}

	render() {

		return (
			<ThemeProvider language={this.state.currentLanguage}>
				<Provider store={store}>
					<div className="container">
						<div className="row">
							<div className="panel panel-info">
							<nav>
								<a onClick={() => this.changeLanguage(en)}>🇺🇸</a>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<a onClick={() => this.changeLanguage(fr)}>🇫🇷</a>
							</nav>
							<Header/>
								<App/>
								<Footer/>
							</div>
						</div>
					</div>
				</Provider>
			</ThemeProvider>
		)
	}
}

render(
	<ShoppingCart/>,
	document.getElementById('app')
)
