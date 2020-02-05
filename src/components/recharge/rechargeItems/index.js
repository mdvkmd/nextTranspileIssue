/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import RechargeItem from './rechargeItem';
import { rechargeItemsKey } from './constants';

const rechargeCategories = css`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 322px) {
    flex-direction: column;
  }
`;
export const RechargeItems = (props) => {
  const { selectServiceType, selectedType } = props;
  const isActive = (key) => selectedType === key;

  return (
    <div css={rechargeCategories} data-testid="rechargeCategories-id">
      <RechargeItem
        rechargeService={rechargeItemsKey.mobility}
        isActive={isActive(rechargeItemsKey.mobility)}
        selectRecharge={selectServiceType}
      />
      <RechargeItem
        rechargeService={rechargeItemsKey.fiber}
        isActive={isActive(rechargeItemsKey.fiber)}
        selectRecharge={selectServiceType}
      />
      <RechargeItem
        rechargeService={rechargeItemsKey.link}
        isActive={isActive(rechargeItemsKey.link)}
        selectRecharge={selectServiceType}
      />
    </div>
  );
};
