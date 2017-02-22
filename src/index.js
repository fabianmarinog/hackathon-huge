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
			currentLocale: 'fr',
			color: 'blue'
		};
	}

	getChildContext() {
		return {locale: locales[this.state.currentLocale]}
	}

	changeLocale(locale) {
		this.setState({currentLocale: locale})
	}

	makeRed() {
    	this.setState({ color: 'red' })
    }

	render() {

		return (
			<ThemeProvider color={this.state.color}>
				<Provider store={store}>
					<div className="container">
						<div className="row">
							<div className="panel panel-info">
							<nav>
								<a onClick={() => this.changeLocale('en')}>🇺🇸</a>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<a onClick={() => this.changeLocale('fr')}>🇫🇷</a>
							</nav>
							<button onClick={this.makeRed.bind(this)}>Red please!</button>
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

ShoppingCart.childContextTypes = {
    locale: PropTypes.object
}

class Theme {
  constructor(color) {
    this.color = color
    this.subscriptions = []
  }

  setColor(color) {
    this.color = color
    this.subscriptions.forEach(f => f())
  }

  subscribe(f) {
    this.subscriptions.push(f)
  }
}

class ThemeProvider extends React.Component {
  constructor(s, c) {
    super(s, c)
    this.theme = new Theme(this.props.color)
  }

  componentWillReceiveProps(next) {
  	console.log(next.color);
    this.theme.setColor(next.color)
  }

  getChildContext() {
    return {theme: this.theme}
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.object
}

render(
	<ShoppingCart/>,
	document.getElementById('app')
)
