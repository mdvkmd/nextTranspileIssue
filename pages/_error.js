/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { withTranslation } from '../i18n';

const errorTopCon = css`
  padding-top: 60px;
  margin-bottom: 150px;
`;

const ErrorPage = ({ t }) => (
  <div css={errorTopCon}>
    <div>
      <center><h1>{t('error404Header')}</h1></center>
      <center>{t('error404Description')}</center>
    </div>
  </div>
);

export default withTranslation('common')(ErrorPage);
