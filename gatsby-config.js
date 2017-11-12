module.exports = {
  siteMetadata: {
    title: `Paul Emmet`,
    author: `Paul Emmet`
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/static/images`,
			},
		},
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
