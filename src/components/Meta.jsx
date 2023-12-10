import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, countInStock
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='countInStock' content={countInStock
} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To ProShop',
  description: 'We sell the best products for cheap',
  countInStock: 10,
};

export default Meta;
