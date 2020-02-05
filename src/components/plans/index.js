/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useRouter } from 'next/router';
import EditNumber from './editNumber';
import { withTranslation } from '../../../i18n';
import { getQueryStringParameters } from '../../utils/urlUtility';

const plansContainer = css`
  background: #EAECED;
  padding-bottom: 25%;
  padding: 0% 1%;
  font-size: 14px;
  font-weight: 300;
  min-height: 135vh;
  @media only screen and (min-width : 768px) and (max-width : 1024px) { padding: 0 5%; }
  @media screen and (min-width: 1025px) and (max-width : 1200px) { padding: 5px 10% 5%; }
  @media screen and (min-width: 1201px) { padding: 15px 20% 5%; }
`;

const updateBackParams = (queryParams) => {
  if (queryParams.serviceId) {
    if (queryParams.serviceId.includes('*')) { delete queryParams.serviceId; }
  }

  if (queryParams.partyId) {
    delete queryParams.partyId;
  }
  queryParams.action = 'edit';
};

const Plans = () => {
  const router = useRouter();
  const queryParams = getQueryStringParameters(router.asPath) || {};
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
    queryParams.e_refid = undefined;
  }

  const onGoBack = () => {
    updateBackParams(queryParams);
    router.push({
      pathname: `${process.env.SUB_DIR}/recharge/${queryParams.serviceType}`,
      query: queryParams
    });
  };

  return (
    <>
      <div css={plansContainer}>
        <EditNumber
          serviceId={queryParams.serviceId}
          onGoBack={onGoBack}
          editable={!((queryParams.source && queryParams.token)) && !(queryParams.selectedServiceId)}
        />
        Plans Page
      </div>
    </>
  );
};

Plans.getInitialProps = async ({ query }) => (
  {
    productType: (query.section || 'mobility'),
    demoNumber: (query.serviceId || query.param1),
    aadhaar: query.aadhaar,
    next: query.next,
    billingType: query.billingType,
    selectedServiceId: query.selectedServiceId,
    isTokenFlow: (query.source && query.token),
    namespacesRequired: ['common', 'error']
  }
);

export default withTranslation(['common', 'error'])(Plans);
