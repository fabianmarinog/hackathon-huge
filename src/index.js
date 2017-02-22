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
			currentLocale: 'fr'
		};
	}

	getChildContext() {
		return {locale: locales[this.state.currentLocale]}
	}

	changeLocale(locale) {
		this.setState({currentLocale: locale})
	}

	render() {

		return (
			<Provider store={store}>
				<div className="container">
					<div className="row">
						<div className="panel panel-info">
						<nav>
							<a onClick={() => this.changeLocale('en')}>🇺🇸</a>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<a onClick={() => this.changeLocale('fr')}>🇫🇷</a>
						</nav>
						<Header/>
							<App/>
							<Footer/>
						</div>
					</div>
				</div>
			</Provider>
		)
	}
}

ShoppingCart.childContextTypes = {
    locale: PropTypes.object
}

render(
	<ShoppingCart locale={locales.fr}/>,
	document.getElementById('app')
)
