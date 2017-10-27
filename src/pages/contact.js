import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import ui from '../layouts/theme'

const Title = styled.h1`
  background: ${ui.color.accent};
  padding: ${ui.size.s};
  
`
const ContactPage = () => (
  <div>
    <Title>Contact Page</Title>
    <Link to="/">Go back to the homepage</Link>
  </div>
)

export default ContactPage