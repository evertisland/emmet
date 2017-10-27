import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import ui from '../layouts/theme'
import backgroundImage from '../../static/images/aquamarine.jpg'

const Title = styled.h1`
  background: ${ui.color.accent};
  padding: ${ui.size.s};
  color: ${ui.color.content}
`
const Container = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  padding: ${ui.size.s};
`

const Preview = styled.div`
	background: rgba(0,0,0,0.5);
	margin: ${ui.size.s} 0;
	padding: ${ui.size.m};
	h1 {
		color: ${ui.color.accent};
		font-size: ${ui.size.ml};
	}
	h2 {
		font-size: ${ui.size.ms};
		color: ${ui.color.contentDarker};
		margin: ${ui.size.xs} 0;
	}
	p {
		color: ${ui.color.contentDark};
		font-weight: 200;
	}
`

export default function Journal ({	data }) {
	const { edges: posts } = data.allMarkdownRemark;
	return (
		<Container className="blog-posts">
			<Title>Le Journal de Paul</Title>
			<div>
				{posts
					.filter(post => post.node.frontmatter.title.length > 0)
					.map(({ node: post }) => {
						return (
							<Preview className="blog-post-preview" key={post.id}>
								<h1>
									<Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
								</h1>
								<h2>{post.frontmatter.date}</h2>
								<p>{post.excerpt}</p>
							</Preview>
						);
					})}
			</div>
		</Container>
	);
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
