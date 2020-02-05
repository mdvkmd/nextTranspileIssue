import { withRouter } from 'next/router';
import App from 'next/app';
import Head from 'next/head';
import Layout from '../src/components/core/layout';
import ProgressBar from '../src/components/core/progress-bar';
import { appWithTranslation } from '../i18n';

class MyTestApp extends App {
  render() {
    const {
      Component, pageProps, router
    } = this.props;
    return (
      <>
        <ProgressBar options={{ easing: 'ease', speed: 500, showSpinner: false }} />
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        </Head>
        <Layout>
          <Component router={router} {...pageProps} />
        </Layout>
      </>
    );
  }
}

export default withRouter(appWithTranslation(MyTestApp));
