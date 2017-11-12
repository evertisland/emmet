import React from 'react'
import styled from 'styled-components'
import ui from '../layouts/theme.js'
import Link from 'gatsby-link'

const Header = ({ className }) => (
	<div className={className}>
		<h1><Link to="/">paul emmet</Link></h1>
		<div>
			{/*<h2><Link to="/who">who?</Link></h2>*/}
			{/*<h2><Link to="/journal">journal</Link></h2>*/}
			{/*<h2><Link to="/contact">contact</Link></h2>*/}
		</div>

	</div>
)
export default styled(Header)`
	background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
	z-index: 1;
	position: fixed;
	padding ${ui.size.s} ${ui.size.m} ;
	left: 0;
	right: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
	h1 {
		margin: 2px 0;
		line-height: 0.7;
		font-size: ${ui.size.ml};
		color: ${ui.color.white};
		text-shadow: 0 0 20px black; 
		&:hover {
			color: ${ui.color.accent};
		}
	}
	div {
		display: flex;		
		h2 {
			margin-left: ${ui.size.s};
			font-size: ${ui.size.m};
			color: ${ui.color.white};
			text-shadow: 0 0 20px black; 
			&:hover {
				color: ${ui.color.accent};				
			}
		}
	}
`