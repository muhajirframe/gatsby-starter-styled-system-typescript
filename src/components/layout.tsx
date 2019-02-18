import { firestore } from 'firebase';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { light } from '../theme';
import './layout.css';

import { Button, TextField } from '@material-ui/core';
import { Box, Flex } from 'rebass';
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
    <Flex alignItems='center'>
      <TextField
        style={{ flex: 1 }}
        type='text'
        variant='outlined'
        onChange={handleChange}
        value={value}
      />

      <Box ml='1'>
        <Button variant='outlined' onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Flex>
  );
}

function RebuildDiscord() {
  return <Button variant='contained'>Rebuild Discord Bot</Button>;
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
          <h1>Discord</h1>
          <Box width='30em'>
            <h3>Keywords</h3>
            <Keywords />
            <AddKeyword />
            <Box py='3'>
              <RebuildDiscord />
            </Box>
          </Box>
          <div>
            <main>{children}</main>
          </div>
        </Box>
      </>
    </ThemeProvider>
  );
};

export default Layout;
