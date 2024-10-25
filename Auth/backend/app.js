//요청 본문을 JSON형식으로 파싱해줌.
const bodyParser = require('body-parser');
//서버 구축 프레임워크
const express = require('express');

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();

//JSON요청을 자동으로 파싱하여 사용.
app.use(bodyParser.json());

app.use((req, res, next) => {
  //모든 요청을 받음(내부,외부)
  res.setHeader('Access-Control-Allow-Origin', '*');
  //GET,POST,PATCH,DELETE 요청을 허락함
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  //Headers는 Content-Type, Authorization밖에 받지 못함.
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  //다음 미들웨어로 요청을 전달
  next();
});

//인증 관련 라우터 기본경로 : /
app.use(authRoutes);

//이벤트 관련 라우터 기본경로 : /events
app.use('/events', eventRoutes);

//error => throw된 값.
app.use((error, req, res, next) => {
  //모든 경로에서 에러가 날 경우,
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080);
