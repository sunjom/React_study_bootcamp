//sign => JWT를 생성하는 함수.
//verify => 클라이언트에서 받은 JWT가 유효한지 확인하는 함수.
const { sign, verify } = require('jsonwebtoken');
//compare => 해시된 비밀번호와 사용자가 입력한 비밀번호를 비교하는 함수.
const { compare } = require('bcryptjs');
//사용자가 인증되지 않았을 때 발생시키는 커스텀 에러 클래스.
const { NotAuthError } = require('./errors');

const KEY = 'supersecret';

function createJSONToken(email) {
  //payload => {eamil}로 전송할 데이터
  //KEY => 토큰을 서명할 때 사용할 비밀키
  // 유효기간 => 1시간 뒤 만료.
  return sign({ email }, KEY, { expiresIn: '1h' });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;
