/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { withTranslation } from '../../../../../i18n';

const rechargeItemCSS = css`
  padding: 4%;
  text-align: center;
  border: 1px solid #214796;
  border-radius: 9px;
  margin: 1%;
  font-family: cursive;
  cursor:pointer !important;
  width: 143px;
  height: 102px;
  @media screen and (max-width: 322px) {
    height: 40px;
  }
  @media screen and (min-width: 323px) and (max-width: 480px) {
    height: 101px;
    width: 101px;
  }
  text-overflow: ellipsis;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const active = css`
  background-color: #214796;
  color: #ffffff;
`;

const rechargeItemImg = css`
  width: 85px;
  height: 70px;
  cursor:pointer;
  @media screen and (max-width: 322px) {
    display: none;
  }
`;

const rechargeRadio = css`
  opacity: 0;
  cursor: pointer;
  position: absolute;
`;

const m1 = css`margin: 0.7%;`;

const title = {
  mobility: 'recharge.text1',
  fiber: 'recharge.text2',
  link: 'recharge.text3'
};

const RechargeItem = (props) => {
  const {
    t, selectRecharge, rechargeService, isActive
  } = props;

  return (
    <section css={m1}>
      {/*eslint-disable*/}
      <div role='radio'
        data-testid="rechargeItem-id"
        css={[rechargeItemCSS, isActive ? active : '']}
        onClick={(e) => {
          e.preventDefault();
          selectRecharge(rechargeService)

        }}
      >
        {/* eslint-enable */}
        <label>
          <img
            height="145px"
            width="145px"
            testid="image-id"
            css={rechargeItemImg}
            alt={t(title[rechargeService])}
          />
          <input
            css={rechargeRadio}
            type="radio"
            name="rechargeItems"
            value={rechargeService}
          />
          <div>{t(title[rechargeService])}</div>
        </label>
      </div>
    </section>
  );
};

export default withTranslation(['common'])(RechargeItem);
