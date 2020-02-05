import { Input } from 'antd';
import styled from '@emotion/styled';

export const JInput = styled(Input)`
  width: 100% !important;
  max-width:  ${(props) => (props.maxwidth ? `${props.maxwidth} !important` : '100% !important;')};
  height:${(props) => (props.height ? `${props.height} !important` : 'inherit')};
  line-height:${(props) => (props.lineheight ? `${props.lineheight} !important` : 'auto')};
  background-color: transparent !important;
  border: none !important;
  border-bottom: ${(props) => (props.borderbottom ? `${props.borderbottom} !important` : '1px solid rgb(183, 183, 185) !important')};
  text-align: ${(props) => (props.textalign ? `${props.textalign} !important` : 'center !important')};
  color: ${(props) => (props.color ? `${props.color} !important` : '#333 !important')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize} !important` : '24px !important')};
  font-weight: 250 !important;
  font-family: ${(props) => (props.fontFamily ? `${props.fontFamily} !important;` : 'inherit')};
  margin-top: 0px !important;
  border-radius: 0px !important;
  padding: ${(props) => (props.padding ? `${props.padding} !important` : '0 !important')};
  padding-right: ${(props) => (props.paddingright ? `${props.paddingright} !important` : '0px !important')};
  text-overflow:${(props) => (props.textoverflow ? `${props.textoverflow}` : 'inherit')};
  ::placeholder{
    font-family:'cursive';
  }
  &:focus {
    border-color: none !important;
    box-shadow: none !important;
    webkit-box-shadow: none !important;
  }
`;
