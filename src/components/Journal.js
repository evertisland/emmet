import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import ui from '../layouts/theme'

const Container = styled.div`
  width: 100%;
  flex: 1;  
  overflow-y: auto;
  .blog-posts {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
  }
`

const Preview = styled.div`		
	margin-bottom: ${ui.size.xs};
	width: 100%;
	.blog-post-preview {
		background: rgba(0,0,0,0.5);
		margin: ${ui.size.xxs};
		padding: ${ui.size.s};
		transition: background ease-in-out .2s;
		height: 100%;
		&:hover {
			background: rgba(0,0,0,0.7);
		}
	}
	h1 {
		color: ${ui.color.accent};
		font-size: ${ui.size.ml};
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
	}
`
const Title = styled.h1`
	color: ${ui.color.accent};
	padding: ${ui.size.s};
	border-bottom: 10px solid black;
	display: inline;
	line-height: 3;
`

export default function Journal ({ posts }) {
	return (
		<Container>
			<Title>JOURNAL</Title>
			<div className="blog-posts">
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
			</div>
		</Container>
	);
}