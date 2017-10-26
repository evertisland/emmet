module.exports = {
  siteMetadata: {
    title: `Paul Emmet`,
    author: `Paul Emmet`
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/pages/posts`,
				name: 'posts',
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: []
			}
		},
  ],
}
