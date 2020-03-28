const RE_ID_CARD = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

const RE_LOGIN_PASSWORD = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

const RE_INVITE_CODE = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6}$/;

const RE_TRADE_PASSWORD = /^\d{6}$/;

/* eslint-disable */
const RE_EMAIL = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

const RE_MOBILE = /^1[23456789]\d{9}$/;

export { RE_ID_CARD, RE_LOGIN_PASSWORD, RE_TRADE_PASSWORD, RE_EMAIL, RE_MOBILE, RE_INVITE_CODE };
