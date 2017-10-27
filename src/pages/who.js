import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import ui from '../layouts/theme'
import backgroundImage from '../../static/images/house.jpg'

const Title = styled.h1`
  background: ${ui.color.accent};
  padding: ${ui.size.s};
  
`
const WhoPage = ({ className }) => (
  <div className={className}>
    <Title>Who Page</Title>
  </div>
)

export default styled(WhoPage)`
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
