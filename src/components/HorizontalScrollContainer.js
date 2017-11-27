import React, { Component } from 'react'
import styled from 'styled-components'
import { debounce } from '../common/functionality'
import ui from '../layouts/theme'

export default styled(class HorizontalScrollContainer extends Component {
	constructor(props) {
		super(props);
		this.handleScroll = debounce(this.handleScroll.bind(this), 10, true)
		this.scroll = this.scroll.bind(this)
		this.state = {
			lastOffset: 0,
			lastDirection: 'back',
			scrollInProgress: false
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleScroll)
		this.container.addEventListener('wheel', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleScroll)
		this.container.removeEventListener('wheel', this.handleScroll)
	}

	scroll(direction, event) {
		console.log(direction)
		const { lastOffset } = this.state;
		const container = this.container.parentNode.parentNode;
		let offset = window.matchMedia("(min-width: 768px)") ? container.clientWidth / 2 : container.clientWidth;

		const getPosition = direction => {
			return {
				behavior: 'smooth',
				left: direction ? lastOffset + offset : lastOffset - offset,
				top: 0
			}
		}
		if (event.deltaX === 1 || event.deltaY === 1) {
			console.log('forward')
			//container.scroll(getPosition(true))
			this.setState({lastOffset: container.scrollLeft})
			return
		}
		if (event.deltaX === -1 || event.deltaY === -1) {
			//console.log('back')
			//container.scroll(getPosition(false))
			this.setState({lastOffset: container.scrollLeft})
		}
		this.setState({scrollInProgress: false})
	}

	handleScroll(event) {
		const initializeScroll = (direction, event) => {
			if (!this.state.scrollInProgress ||
				direction !== this.state.lastDirection) {
				this.setState({
					scrollInProgress: true,
					lastDirection: direction
				})
				debounce(this.scroll(direction, event), 100, false)
			}
		}
		if (event.deltaX === 1 || event.deltaY === 1) {
			initializeScroll('forward', event)
		}
		if (event.deltaX === -1 || event.deltaY === -1) {
			initializeScroll('backward', event)
		}
	}


	render() {
		return (
			<div
				className={this.props.className}
				ref={el => this.container = el}>
				<div className="scroll-delimiter">
					{this.props.children}
				</div>
			</div>
		)
	}
})`
	max-height: 100vh;  
  overflow-x: visible;
	width: 100vw;
	overflow-y: hidden;
	
	.scroll-delimiter {
		text-align: justify;	  	
		column-width: 100vw;
		column-gap: 0;
		column-rule: 2px dashed rgba(14,17,17,0.4);
		max-height: 100vh;	
		@media (min-width: 768px) {
			column-width: ${
				props => 
					props.blogPost
						? '50vw' : '100vw'
			};
		}
	}
`