import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{ title }</title>
      <meta name='description' content={ description }/>
      <meta name='keywords' content={ keywords }/>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Ласкаво просимо до MyShop',
  keywords: 'Топи, трусики , бюсти, піжамки в Instagram_ «Шикарний чорний 💣💣💣💣 ✔️ бюст без паролону на чашку В ✔️ ззаду на одну застібку ✔️ трусики висока посадка ✔️ розмір М_L У ньому ви точно…»',
  description: 'Ми продаємо найкращий товар дешево'
};

export default Meta;
