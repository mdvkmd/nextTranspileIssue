/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { withTranslation } from '../../../../i18n';

const numDetails = css`
  padding: 18px 0;
  background: #EAECED;
  text-align: center;
`;
const pretextCSS = css`
  text-align: right;
  font-size: 20px;
  line-height: 1.6;
  color: rgb(51, 51, 51);
`;

const editNumberCon = css`
  border-bottom: 1px solid #ccc;
  display: inline;
  padding-bottom: 5px;
`;
const num = css`
  color: rgb(0,0,0);
  font-size: 20px;
    padding: 0;
    margin-right: 10px;
`;
const edit = css`
  color: rgb(77,77,77);
  font-size: 15px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;
  text-transform: uppercase;
`;

const EditNumber = (props) => {
  const {
    t, serviceId, onGoBack, pretext, editable = true
  } = props;
  return (
    <div css={numDetails}>
      <div css={editNumberCon}>
        <span css={pretextCSS}>{pretext || null}</span>
        <span css={num}>{serviceId}</span>
        {editable ? <span css={edit} onClick={onGoBack} role="button" tabIndex={0}>{t('recharge.editText')}</span> : null}
      </div>
    </div>
  );
};

export default withTranslation(['common'])(EditNumber);
