import { Global } from '@emotion/core';
import Document, { Head, Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';
import antDStyle from 'antd/dist/antd.css';

const helmetHeadComponents = () => {
  const filterProps = [
    'htmlAttributes',
    'bodyAttributes',
    'title'
  ];
  return Object.keys(Helmet.renderStatic())
    .filter((el) => !~filterProps.indexOf[el])
    .map((el) => Helmet.renderStatic()[el].toComponent());
};

const helmetBodyAttrComponents = () => Helmet.renderStatic().bodyAttributes.toComponent();

const helmetJsx = () => (
  <Helmet>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="/static/images/favicon.ico" type="image/x-icon" />
  </Helmet>
);

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {helmetJsx}
          {helmetHeadComponents}
        </Head>
        <body
          {...helmetBodyAttrComponents}
        >
          <Global styles={antDStyle} />
          {this.props.styleTags}
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
