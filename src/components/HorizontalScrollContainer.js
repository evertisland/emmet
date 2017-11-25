import React from 'react'
import styled from 'styled-components'
import { debounce } from '../common/functionality'
import ui from '../layouts/theme'

export default styled(class HorizontalScrollContainer extends Component {
	constructor(props) {
		super(props);
		this.handleScroll = debounce(this.handleScroll.bind(this), 250, true)
		this.scroll = this.scroll.bind(this)
		this.state = {
			lastScrollPosition: 0,
			lastScrollDirection: 'back',
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

	scroll(event) {
		console.log('scrolling')
		const { lastScrollPosition } = this.state;
		const container = this.container.parentNode.parentNode;
		let offset = window.matchMedia("(min-width: 768px)") ? container.clientWidth / 2 : container.clientWidth;

		const getPosition = direction => {
			return {
				behavior: 'smooth',
				left: direction ? lastScrollPosition + offset : lastScrollPosition - offset,
				top: 0
			}
		}
		if (event.deltaX === 1 || event.deltaY === 1) {
			console.log('forward')
			//container.scroll(getPosition(true))
			this.setState({lastScrollPosition: container.scrollLeft})
			return
		}
		if (event.deltaX === -1 || event.deltaY === -1) {
			console.log('back')
			//container.scroll(getPosition(false))
			this.setState({lastScrollPosition: container.scrollLeft})
		}
		setTimeout( () => {
			this.setState({scrollInProgress: false})
		}, 250)
	}

	handleScroll(event) {
		const { scrollInProgress, lastScrollDirection} = this.state;
		if (event.deltaX === 1 || event.deltaY === 1) {
			if (lastScrollDirection !== 'back' && !scrollInProgress) {
				this.setState({
					scrollInProgress: true,
					lastScrollDirection: 'forward'
				})
				this.scroll(event)
			}
			return
		}
		if (event.deltaX === -1 || event.deltaY === -1) {
			if (lastScrollDirection !== 'forward' && !scrollInProgress) {
				this.setState({
					scrollInProgress: true,
					lastScrollDirection: 'back'
				})
				this.scroll(event)
			}
		}
	}


	render() {
		return <div className={this.props.className} ref={el => this.container = el}>
			{this.props.children}
		</div>
	}
})`
	border: 2px solid orange;

`