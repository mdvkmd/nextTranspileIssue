/* eslint-disable jsx-a11y/no-static-element-interactions */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { baseStyles } from '../../styles/variables';
import { RechargeItems } from './rechargeItems';
import { DemoNrInput } from '../commons/demoNrInput';
import { JButton } from '../commons/styled-components/jButton';
import { withTranslation } from '../../../i18n';
import { removeNullPropsFromObj } from '../../utils/object';
import { getQueryStringParameters } from '../../utils/urlUtility';

const container = css`
  font-family: cursive;
  background-color: #ffffff;
  color: ${baseStyles.text_color_dark};
  line-height: 1.4;
  padding-top: 35px;
  position: relative;
  text-align: center;
`;
const closeButton = css`
@media screen and (max-width: 768px) {
  margin-left: -27px
  }
`;

const submitButton = css`
@media screen and (max-width: 768px) {
    margin-top: 20px !important;
  }
`;

const submitNoTitle = css`
  font-weight: 300;
  color: ${baseStyles.text_color_light};
  @media screen and (max-width: ${baseStyles.xs}) {
    font-size: 30px !important;
  }
  @media screen and (min-width: ${baseStyles.xs}) and (max-width: ${baseStyles.md_1}){
    font-size: 33px !important;
  }
  @media screen and (min-width: ${baseStyles.md}) {
    font-size: 36px !important;
  }
`;
const primeDNewRechSelParentCon = css`
  background-color: ${baseStyles.bg_grey};
  border-bottom: 1px solid #ccc;
  padding: 25px 0px 25px 0px;
  margin-top: 20px;
  @media screen and (max-width: ${baseStyles.lg_1}){
    max-height: 150px;
  }
  @media screen and (min-width: ${baseStyles.lg}) and (max-width: ${baseStyles.xl_1}){
    max-height: 160px;
  }
  @media only screen and (min-width : ${baseStyles.xl}) {
    max-height: 170px;
  }
`;
const shimmerHidden = css`
  height: 50px;
  box-sizing: border-box;
`;
const visible = css`display: block !important;`;
const searchSection = css`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const normalizeQueryParams = (queryParams = {}) => {
  if (queryParams.param1) {
    queryParams.serviceId = queryParams.param1;
    queryParams.param1 = undefined;
  }
  if (queryParams.refid) {
    queryParams.partyId = queryParams.refid;
    queryParams.refid = undefined;
  }
  if (queryParams.e_refid) {
    queryParams.erefId = queryParams.e_refid;
    queryParams.refid = undefined;
  }
  return queryParams;
};

const myDemoParams = [
  'erefId',
  'msg',
  'partyId',
  'ptab',
  'serviceId',
  'serviceType',
  'source',
  'token'
];

const reqObj = {
  serviceId: '',
  partyId: null,
  source: null,
  ptab: null,
  token: null,
  msg: null,
  serviceType: null,
  erefId: null
};

const Recharge = ({ productType, t }) => {
  const router = useRouter();
  const queryParams = normalizeQueryParams(getQueryStringParameters(router.asPath) || {});
  const [serviceType, setServiceType] = useState(productType || 'Text1');
  const [submitNumber, setSubmitNumber] = useState(queryParams.serviceId || '');
  const demoInputRef = useRef('demoNrInputRef');

  const selectServiceType = (key) => {
    setServiceType(key);
    router.push(`${process.env.SUB_DIR}/recharge/[section]`, `${process.env.SUB_DIR}/recharge/${key}`);
  };

  const handleSubmitNumberSuccess = (linkedData) => {
    let nextObj = { ...reqObj };
    nextObj.serviceId = linkedData.primaryService.maskedServiceId || linkedData.primaryService.serviceId;
    nextObj.serviceType = linkedData.productType.toLocaleLowerCase();
    nextObj.next = linkedData.nextPage;
    nextObj.billingType = linkedData.primaryService.billingType;
    nextObj = removeNullPropsFromObj(nextObj);
    router.push({ pathname: `${process.env.SUB_DIR}/recharge/${nextObj.serviceType}/${linkedData.next}`, query: nextObj });
  };

  const submitNum = async () => {
    const resp = await Promise.resolve({
      primaryService: {
        serviceId: '7021100122',
        primeMember: true,
        billingType: 'PREPAID',
        deleted: false,
        serviceCharacteristics: [
          { name: 'TALKTIME_BALANCE', value: '176.17' },
          { name: 'TALKTIME_MINS', value: '2936' }
        ]
      },
      nextPage: 'PREPAID',
      next: 'plans',
      productType: 'MOBILITY'
    });
    handleSubmitNumberSuccess(resp);
  };

  const initiateRecharge = () => (submitNum(reqObj));

  const changeSubmitNumber = (val) => {
    setSubmitNumber(val);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      initiateRecharge();
    }
  };

  const clearInput = () => {
    setSubmitNumber('');
    demoInputRef.current.focus();
  };

  useEffect(() => {
    if (Object.keys(queryParams).length > 1 || queryParams.e_refid || queryParams.erefId || queryParams.serviceId) {
      Object.keys(queryParams).forEach((key) => {
        if (~myDemoParams.indexOf(key)) {
          reqObj[key] = queryParams[key];
        }
      });
      !queryParams.action && submitNum(reqObj);
    }
  }, []);

  useEffect(() => {
    reqObj.serviceId = submitNumber;
    return () => { };
  }, [submitNumber]);

  useEffect(() => {
    reqObj.serviceType = serviceType;
    demoInputRef.current.focus();
    return () => { };
  }, [serviceType]);

  return (
    <div css={container} data-testid="rechargePage">
      <section tabIndex="-1" role="heading" aria-level="1" aria-label="heading" css={submitNoTitle}>
        Test Application
      </section>
      <RechargeItems selectServiceType={selectServiceType} selectedType={serviceType} t={t} />

      <div role="main">
        <form>
          <div css={primeDNewRechSelParentCon}>
            <div css={[shimmerHidden, visible]}>
              <div css={searchSection} data-testid="inputField-id">
                <DemoNrInput
                  type="tel"
                  value={submitNumber}
                  max={12}
                  ref={demoInputRef}
                  floatinglabel={serviceType}
                  onChange={(val) => changeSubmitNumber(val)}
                  onKeyPress={(e) => handleKeyPress(e)}
                  placeholderfontsize="14px"
                  placeholderInitialFontSize="16px"
                />
                {submitNumber.length
                  ? (
                    <div css={closeButton} height="0px" width="0px" onClick={clearInput}>
                      X
                    </div>
                  )
                  : null}
              </div>

            </div>
            <div>
              <JButton
                css={submitButton}
                type="submit"
                loading={false}
                onClick={initiateRecharge}
              >
                {t('submitLabel')}
              </JButton>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Recharge.getInitialProps = async ({ query }) => ({
  productType: (query.section || 'Text1'),
  namespacesRequired: ['common', 'error']
}
);

export default withTranslation(['common'])(Recharge);
