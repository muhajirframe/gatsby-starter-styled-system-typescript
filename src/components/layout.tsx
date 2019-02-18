import { firestore } from 'firebase';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { light } from '../theme';
import './layout.css';

import { Box } from 'rebass';
import { getFirebaseApp } from '../lib/firebase';
import Header from './header';
import Keywords from './Keywords';

const app = getFirebaseApp();
const ref = app
  .firestore()
  .collection('configs')
  .doc('discord');
function AddKeyword() {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleSubmit = () => {
    ref.update({
      keywords: firestore.FieldValue.arrayUnion(value),
    });
  };
  return (
    <div>
      <input type='text' onChange={handleChange} value={value} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

const QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const data = useStaticQuery(QUERY);

  return (
    <ThemeProvider theme={light}>
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Box p='5'>
          <Box width='30em'>
            <Keywords />
            <AddKeyword />
          </Box>
          <div>
            <main>{children}</main>
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href='https://www.gatsbyjs.org'>Gatsby</a>
            </footer>
          </div>
        </Box>
      </>
    </ThemeProvider>
  );
};

export default Layout;
