import Droppable from './testing/modules/Droppable'
import CopyClipboard from './testing/modules/CopyClipboard'

import './testing/modules/mocha-setup'
import React from 'react'
import { render } from 'react-dom'
import { Simulate } from 'react-addons-test-utils'
import expect from 'expect'
import Header from './components/common/Header'

describe('Header', () => {
 let div
 beforeEach(() => div = document.createElement('div'))

 it('displays the header title', () => {
   render(<Header header="hallo"/>, div)
   const divTitle = div.querySelector('.animated-title');
   expect(divTitle.innerHTML).toMatch(/hallo/, '"hallo" was not found in HTML')
 })

 describe('isOpen prop', () => {
   it('does not display children when false', () => {
     render((
       <Header header="hallo" isOpen={false}>
         <p>Hey</p>
       </Header>
     ), div)

     expect(div.innerHTML).toNotMatch(/Hey/, '"Hey" was found in HTML')
   })

   it('defaults to false', () => {
     render((
       <Header isOpen="">
         <p>Hey</p>
       </Header>
     ), div)

     expect(div.innerHTML).toNotMatch(/Hey/, '"Hey" was found in HTML')
   })

   it('display children when true', () => {
     render((
       <Header header="hallo" isOpen={true}>
         <p>Hey</p>
       </Header>
     ), div)

     expect(div.innerHTML).toMatch(/Hey/, '"Hey" was not found in HTML')
   })
  })
})

describe('Droppable', () => {
 let div
 beforeEach(() => {
   div = document.createElement('div')
   document.body.appendChild(div)
 })

 afterEach(() => document.body.removeChild(div))

 it('accepts files', () => {
   render(<Droppable/>, div)
   Simulate.dragOver(div.querySelector('div.Droppable'), {
     dataTransfer: { types: ['Files'] }
   })
   expect(div.innerHTML).toMatch(/Drop it!/, '"Drop it!" was not found in HTML')
 })
})

describe('CopyClipboard', () => {
 let div
 beforeEach(() => {
   div = document.createElement('div')
   document.body.appendChild(div)
 })

 afterEach(() => document.body.removeChild(div))

 it('copy url', () => {
   render(<CopyClipboard/>, div)
   Simulate.click(div.querySelector('button'))
   expect(div.innerHTML).toMatch(new RegExp(location.href), '"current url" was not found in HTML')
 })
})

// import React, { Component, PropTypes } from 'react';
//
// import { render } from 'react-dom'
// import styles from './styles/main.scss'
//
// import Header from './components/common/Header'
// import Footer from './components/common/Footer'
// import CartItem from './components/CartItem'
// import App from './containers/App'
//
// import { productsData } from './data/data'
//
// import rootReducer from './reducers/index'
// import { createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import createLogger from 'redux-logger'
// import thunk from 'redux-thunk'
//
// import ThemeProvider from './containers/ThemeProvider'
//
// import { en } from './locales/en';
// import { fr } from './locales/fr';
//
// const locales = {en, fr};
//
// const middleware = [ thunk ];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }
//
// const defaultState = {
// 	products: productsData.products,
// 	cartProducts: []
// }
//
// const store = createStore(rootReducer, defaultState, applyMiddleware(...middleware))
//
// class ShoppingCart extends React.Component {
//
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			currentLanguage: fr
// 		};
// 	}
//
// 	changeLanguage(locale) {
// 		this.setState({ currentLanguage: locale})
// 	}
//
// 	render() {
//
// 		return (
// 			<ThemeProvider language={this.state.currentLanguage}>
// 				<Provider store={store}>
// 					<div className="container">
// 						<div className="row">
// 							<div className="panel panel-info">
// 							<nav>
// 								<a onClick={() => this.changeLanguage(en)}>🇺🇸</a>
// 								&nbsp;&nbsp;&nbsp;&nbsp;
// 								<a onClick={() => this.changeLanguage(fr)}>🇫🇷</a>
// 							</nav>
//               <Header/>
// 								<App/>
// 								<Footer/>
//                 <Droppable/>
//                 <CopyClipboard/>
// 							</div>
// 						</div>
// 					</div>
// 				</Provider>
// 			</ThemeProvider>
// 		)
// 	}
// }
//
// render(
// 	<ShoppingCart/>,
// 	document.getElementById('app')
// )
