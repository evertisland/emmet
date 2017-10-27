import React from 'react'
import styled from 'styled-components'
import ui from '../layouts/theme'
import backgroundImage from '../../static/images/rust.jpg'
const Title = styled.h1`
  background: ${ui.color.accent};
  padding: ${ui.size.s};
  
`
const ContactPage = ({ className }) => (
  <div className={className}>
    <Title>Get in touch</Title>
  </div>
)

export default styled(ContactPage)`
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