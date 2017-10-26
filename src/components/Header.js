import React from 'react'
import styled from 'styled-components'
import ui from '../layouts/theme.js'
import Link from 'gatsby-link'

const Header = ({ className }) => (
	<div className={className}>
		<h1>
			<Link to="/">Paul Emmet</Link>
		</h1>
		<h2>
			<Link to="/contact">Contact</Link>
		</h2>
	</div>
)
export default styled(Header)`
	background-color: ${ui.color.contentDarker};
	position: fixed;
	padding ${ui.size.m};
	height: ${ui.component.header.height};
	left: ${ui.component.body.margin};
	right: ${ui.component.body.margin};
	top: ${ui.component.body.margin};
	display: flex;
	align-items: center;
`