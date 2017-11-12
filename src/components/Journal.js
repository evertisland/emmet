import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import ui from '../layouts/theme'

const Container = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;  
  .blog-posts {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
  }
`

const Preview = styled.div`		
	@media (min-width: 768px) {
		width: 50%;
	}
	margin-bottom: ${ui.size.xs};
	.blog-post-preview {
		background: rgba(0,0,0,0.5);
		margin: ${ui.size.xxs};
		padding: ${ui.size.m};
		border-radius: ${ui.size.xxs};
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
		color: ${ui.color.contentDark};
		margin: ${ui.size.xs} 0;
	}
	p {
		color: ${ui.color.white};
		font-weight: 200;
	}
`

export default function Journal ({ posts }) {
	return (
		<Container>
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
										<p>{post.excerpt}</p>
									</div>
								</Link>
							</Preview>
						);
					})}
			</div>
		</Container>
	);
}