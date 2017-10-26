import React from 'react'
import styled from 'styled-components'
import ui from '../layouts/theme.js'
import Link from 'gatsby-link'

const Header = ({ className }) => (
	<div className={className}>
		<h1><Link to="/">paul emmet</Link></h1>
		<div>
			<h2><Link to="/who">who?</Link></h2>
			<h2><Link to="/journal">journal</Link></h2>
			<h2><Link to="/contact">contact</Link></h2>
		</div>

	</div>
)
export default styled(Header)`
	background-color: ${ui.color.contentDarker};
	position: fixed;
	padding ${ui.size.s};
	height: ${ui.component.header.height};
	left: ${ui.component.body.margin};
	right: ${ui.component.body.margin};
	top: ${ui.component.body.margin};
	display: flex;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
	h1 {
		margin-top: -4px;
		line-height: 0.7;
		font-size: ${ui.size.ml};
		color: ${ui.color.contentDark};
		&:hover {
			color: ${ui.color.content};
		}
	}
	div {
		display: flex;		
		h2 {
			margin-left: ${ui.size.s};
			font-size: ${ui.size.m};
			&:hover {
				color: ${ui.color.contentDark};
			}
		}
	}
`