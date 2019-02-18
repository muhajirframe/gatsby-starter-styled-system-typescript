import { Link } from 'gatsby';
import React from 'react';

import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title='Home' keywords={[`gatsby`, `application`, `react`]} />
  </Layout>
);

export default IndexPage;
