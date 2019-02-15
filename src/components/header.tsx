import { Link } from 'gatsby';
import React from 'react';
import { Box } from './primitives';

interface IProps {
  siteTitle: string;
}

const Header: React.FunctionComponent<IProps> = (props) => (
  <Box bg='primary' color='primary'>
    <h1 style={{ margin: 0 }}>
      <Link to='/' style={{ color: `white`, textDecoration: `none` }}>
        {props.siteTitle}
      </Link>
    </h1>
  </Box>
);

export default Header;
