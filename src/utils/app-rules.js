export const APP_CONSTANTS = {
  MOBILE_NO_LENGTH: 10,
  OTP_LENGTH: 6,
  MPIN_LENGTH: 4,
  OTP_RESEND_TIMOUT: 15000
};

export const APP_REGEX = {
  NUMBER: /^[+0-9]+$/,
  DECIMAL: /^[0-9]+([.]{1}[0-9]{2}){0,1}$/,
  EMAIL: /[A-Z a-z 0-9._-]*@[A-Z0-9.-]*.+[a-z 0-9 A-Z]$/,
  MPIN: /^[0-9]{4}$/
};
