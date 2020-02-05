import { Button } from 'antd';
import styled from '@emotion/styled';

export const JButton = styled(Button)`
  font-weight:${(props) => (props.fw ? `${props.fw} !important` : '600 !important;')};
  background-image: none !important;
  font-family: ${(props) => (props.ff ? `${props.ff} !important` : 'cursive !important;')}; 
  font-size: ${(props) => (props.fs ? props.fs : '14px !important;')};
  padding: ${(props) => (props.padding ? props.padding : '7px 40px !important;')};
  border-radius: ${(props) => (props.borderradius ? props.borderradius : '30px !important;')};
  outline: none !important;
  cursor: pointer !important;
  line-height: 1.2 !important;
  background-color: ${(props) => (props.backgroundcolor ? `${props.backgroundcolor} !important` : '#214796 !important;')};
  border-color: #214796 !important;
  margin: ${(props) => (props.margin ? props.margin : '0 auto !important;')};
  color: ${(props) => (props.color ? `${props.color} !important` : '#fff !important;')};
  -webkit-text-fill-color: ${(props) => (props.color ? `${props.color} !important` : '#fff !important;')}; 
  margin-top: 2% !important;
  min-width: ${(props) => (props.minwidth ? props.minwidth : 'auto;')};
  &:after {
    animation: 0s !important;
  }
  height:${(props) => (props.height ? props.height : '32px;')};
  width: ${(props) => (props.width ? `${props.width} !important` : 'auto;')};
  disabled: ${(props) => (props.disabled ? props.disabled : false)};
  @media screen and (max-width: 767px) {
    display: ${(props) => (props.desktoponly === 'true' ? 'none !important' : 'block')};
  }
`;
