/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { withTranslation } from '../../../../i18n';

const bodyCon = css`
  padding-top: 55px;
  @media screen and (max-width: 322px) { padding-top: 40px; }
  @media print { padding-top: 0; }
`;

const Layout = (props) => {
  const { children } = props;
  return (
    <div css={bodyCon}>
      {children}
    </div>
  );
};

export default (withTranslation('common')(Layout));
