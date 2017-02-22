import React, { Component, PropTypes } from 'react';
import Theme from './Theme'

class ThemeProvider extends React.Component {
	constructor(s, c) {
		super(s, c)
		this.theme = new Theme(this.props.language)
	}

	componentWillReceiveProps(next) {
		this.theme.setLanguage(next.language)
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

export default ThemeProvider;
