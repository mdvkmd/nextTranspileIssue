import { Button } from 'antd';
import styled from '@emotion/styled';

export const MobileJButton = styled(Button)`
    padding: 0 !important; 
    position: fixed !important;
    bottom: 0 !important;
    left:0 !important;
    width: 100% !important;
    color: white !important;
    background-color: ${(props) => (props.active === 'true' ? '#214796 !important' : '#7480c7 !important')};
    cursor: ${(props) => (props.active === 'true' ? 'pointer !important' : 'default !important')};
    text-align: center !important;
    border-radius: 0px !important;
    font-size:  ${(props) => (props.fs ? `${props.fs} !important` : 'inherit')};
    font-family: ${(props) => (props.ff ? `${props.ff} !important` : 'cursive !important;')}; 
    border: none;
    height:50px !important;
    @media only screen and (min-width : 768px) {
        display: none !important;
    }
`;
