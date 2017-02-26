import React, { PropTypes } from 'react'
import { Motion, StaggeredMotion, spring, presets } from 'react-motion'

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
	}

  toggle() {
		this.setState({ isActive: !this.state.isActive })
  }

  render() {
		const { theme } = this.context
    const x = this.state.isActive ? 400 : 0
		
		return (
			<div className="panel-heading">
				<div className="panel-title" onClick={() => this.toggle()}>
				<Motion style={{ x: spring(x) }} children={style => (
					<h5 className="animated-title" style={{ left: style.x }}>
						<span className="glyphicon glyphicon-shopping-cart"></span>
						{theme.language.header}
					</h5>
				)}/>
				</div>
			</div>
		)
  }
}

Header.contextTypes = {
	theme: PropTypes.object
}

export default Header
