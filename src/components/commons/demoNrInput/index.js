
/** @jsx jsx */
import {
  useState, useEffect, useRef, useImperativeHandle, forwardRef
} from 'react';
import { JInput } from 'components/commons/styled-components/jInput';
import { css, jsx } from '@emotion/core';

export const DemoNrInput = forwardRef((props, ref) => {
  const {
    autofocus, autocomplete, value, floatinglabel, textAlign,
    fontSize, color, placeholderTextFont, placeholderTextColor,
    placeholderInitialFontSize, placeholderInitialTop,
    placeholderTop, placeholderAlignment, type = 'tel', placeholderfontsize, placeholderPadding, placeholderInitialColor, ...rest
  } = props;
  const [fieldActivate, setFieldActivate] = useState(autofocus || false);
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  const onChange = (e) => {
    const currVal = e.currentTarget.value;
    let val;
    if (type !== 'text') {
      val = currVal && currVal.trim() && currVal.replace(/\D+/g, '');
      val = props.max && val.length >= props.max ? val.substring(0, props.max) : val;
    } else {
      val = currVal;
    }
    props.onChange && props.onChange(val);
  };

  const onFocus = () => {
    setFieldActivate(true);
    props.onFocus && props.onFocus(true);
  };

  const onBlur = () => {
    if (!value) {
      setFieldActivate(false);
    }
    props.onBlur && props.onBlur();
  };

  const handleKeyPress = (elem) => {
    props.onKeyPress && props.onKeyPress(elem);
  };

  useEffect(() => {
    value && setFieldActivate(true);
  }, []);

  const inputIsFocused = css`
      background-image: none;
      color: ${placeholderTextColor || '#2F65B0'};
      text-align:${placeholderAlignment || 'center'};
font-size: ${placeholderfontsize || '10px'};
      font-family: ${placeholderTextFont || 'cursive'};
      outline: none;
      position: relative;
      padding:${placeholderPadding || '0'};
      top:  ${placeholderTop || '0px'};
      Webkit-transition: all .3s linear;
      transition: all .3s linear;
      @media screen and (min-width: 767px) {
        font-size:12px;
      }
    `;

  const inputIsEmpty = css`
      background-image: none;
      font-size: ${placeholderInitialFontSize || '14px'};
      font-family: cursive;
      text-align:${placeholderAlignment || 'center'};
      color:${placeholderInitialColor || 'inherit'};
      outline: none;
      position: relative;
      top: ${placeholderInitialTop || '25px'};
      Webkit-transition: all .3s linear;
      transition: all .3s linear;
    `;

  return (
    <div className="field-group">
      <div
        data-testid="floatingTest-id"
        css={fieldActivate ? inputIsFocused : inputIsEmpty}
      >
        {floatinglabel || null}
      </div>
      <JInput
        {...rest}
        ref={inputRef}
        data-testid="jInput-id"
        name="demoNrInputName"
        aria-label="demoNrInputNamech"
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        autoComplete={autocomplete || 'on'}
        onKeyPress={handleKeyPress}
        textalign={textAlign}
        fontSize={fontSize}
        color={color}
      />
    </div>
  );
});
