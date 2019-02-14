import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Header from './header';
import './layout.css';

const QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

interface IProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  children: React.ReactNode;
}

// style={{
//   margin: `0 auto`,
//   maxWidth: 960,
//   padding: `0px 1.0875rem 1.45rem`,
//   paddingTop: 0,
// }}

const BuildInnerRender: React.FC<IProps> = (props) => (
  <>
    <Header siteTitle={props.data.site.siteMetadata.title} />
    <div>
      <main>{props.children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href='https://www.gatsbyjs.org'>Gatsby</a>
      </footer>
    </div>
  </>
);

const Layout: React.FunctionComponent = ({ children }) => (
  <StaticQuery query={QUERY}>
    {(data) => <BuildInnerRender data={data}>{children}</BuildInnerRender>}
  </StaticQuery>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
