import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to ChanStore',
  description: 'We sell the best product at the most reasonable price ever',
  keywords: 'ecommerce,ChanStore, buy cheap',
};

export default Meta;
