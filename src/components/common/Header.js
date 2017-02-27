import React, { PropTypes } from 'react'
import { Motion, StaggeredMotion, spring, presets } from 'react-motion'
import { Mixin as TweenStateMixin } from 'react-tween-state'

const TweenToggleHeader = React.createClass({

	propTypes: {
    animationDuration: PropTypes.number,
    isActive: PropTypes.bool.isRequired
  },

	contextTypes: {
		theme: PropTypes.object
	},

  mixins: [ TweenStateMixin ],

  getDefaultProps() {
    return {
      animationDuration: 400
    }
  },

  getInitialState() {
    return {
      knobLeft: 0
    }
  },

  componentWillReceiveProps(nextProps) {
    this.tweenState('knobLeft', {
      duration: this.props.animationDuration,
      endValue: (nextProps.isActive ? 400 : 0)
    })
  },

  render() {
    const knobLeft = this.getTweeningValue('knobLeft')
    const knobStyle = {
      WebkitTransform: `translate3d(${knobLeft}px,0,0)`,
      transform: `translate3d(${knobLeft}px,0,0)`
    }

		const { theme } = this.context
		const header = (theme && theme.language) ? theme.language.header : this.props.header;
    return (
			<div className="panel-info">
				<div className="panel-heading">
					<div className="panel-title">
						<h5 className="animated-title" style={knobStyle}>
							<span className="glyphicon glyphicon-shopping-cart"></span>
							{header}
						</h5>
					</div>
				</div>
			</div>
    )
  }
})



const SpringToggleHeader = React.createClass({
  propTypes: {
    isActive: PropTypes.bool.isRequired
  },

	contextTypes: {
		theme: PropTypes.object
	},

  render() {
    const x = this.props.isActive ? 400 : 0
		const { theme } = this.context
		const header = (theme && theme.language) ? theme.language.header : this.props.header;

    return (
			<div className="panel-info">
				<div className="panel-heading">
					<div className="panel-title">
					<Motion defaultStyle={{ x }} style={{ x: spring(x) }}>
						{s => (
							<h5 className="animated-title" style={{
	            	WebkitTransform: `translate3d(${s.x}px,0,0)`,
	            	transform: `translate3d(${s.x}px,0,0)` }}>
								<span className="glyphicon glyphicon-shopping-cart"></span>
								{header}
								</h5>
							)}
							</Motion>
					</div>
				</div>
			</div>
    )
  }
})


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
	}

	componentDidMount() {
		this.context.theme && this.context.theme.subscribe(() => this.forceUpdate())
	}

  toggle() {
		this.setState({ isActive: !this.state.isActive })
  }

  render() {
		const { theme } = this.context
		const header = (theme && theme.language) ? theme.language.header : this.props.header;
		const headerButton = (theme && theme.language) ? theme.language.headerButton : this.props.headerButton;
		return (
			<div>
				<TweenToggleHeader header={header} isActive={this.state.isActive}/>
				<SpringToggleHeader header={header} isActive={this.state.isActive}/>
				<button onClick={() => this.toggle()}>{headerButton}</button>
				{this.props.isOpen && this.props.children}
			</div>
		)
  }
}

Header.contextTypes = {
	theme: PropTypes.object
}

export default Header
