import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import ui from '../layouts/theme'
import HorizontalScrollContainer from '../components/HorizontalScrollContainer'

const Container = styled.div`
  width: 100%;
  flex: 1;  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  break-inside: avoid;
`

const Preview = styled.div`		
	width: 100%;	
	.blog-post-preview {
		background: rgba(14,17,17,0.4);		
		margin: 0 ${ui.component.body.margin};
		padding: ${ui.size.s};		
		padding-bottom: 20px;
		transition: background ease-in-out .2s;
		height: 100%;
		&:hover {
			background: rgba(0,0,0,0.7);
		}
	}
	h1 {
		color: ${ui.color.accent};
		font-size: ${ui.size.m};
	}
	h2 {
		font-size: ${ui.size.ms};
		line-height: 0.2;
		color: ${ui.color.contentDark};
		margin-top: ${ui.size.xs};
	}
	p {
		color: ${ui.color.white};
		font-weight: 200;
		font-size: ${ui.size.ms}
	}
	@media (min-width: 768px) {
		width: 50%;
		.blog-post-preview {
			margin: 0;
		}
		h1 {
			font-size: ${ui.size.ml};
		}
	}
`

export default function Journal ({ posts }) {
	return (
		<Container>
			{posts
				.filter(post => post.node.frontmatter.title.length > 0)
				.map(({ node: post }) => {
					return (
						<Preview key={post.id}>
							<Link to={post.frontmatter.path}>
								<div className="blog-post-preview">
									<h1>{post.frontmatter.title}</h1>
									<h2>{post.frontmatter.date}</h2>
									{/* <p>{post.excerpt}</p> */}
								</div>
							</Link>
						</Preview>
					);
				})}
		</Container>
	);
}