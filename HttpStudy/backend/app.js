//파일 시스템 작업(읽기, 쓰기) 처리
import fs from 'node:fs/promises';
//POST 및 PUT 요청에서 들어오는 요청 본문을 구문 분석하는데 사용.
import bodyParser from 'body-parser';
//서버를 설정하고 요청을 처리하는데 사용
import express from 'express';

const app = express();

//images 폴더를 클라이언트가 접근할 수 있게함.
//ex listen을 3000으로 줬기 때문에 http://localhost3000/imgsrc
app.use(express.static('images'));
//들어오는 JSON 형식의 본문을 자동으로 구문 분석하여 req.body에 추가.
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');
  //JSON을 객체로 만듦.
  const placesData = JSON.parse(fileContent);

  //객체를 다시 /places주소에 JSON값으로 바꿔서 줌.
  res.status(200).json({ places: placesData });
});

app.get('/user-places', async (req, res) => {
  const fileContent = await fs.readFile('./data/user-places.json');

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put('/user-places', async (req, res) => {
  //body안에 있는 places라는 객체에서 가져옴.
  const places = req.body.places;
  // await : fs.writeFile 함수가 파일 쓰기 작업을 완료할때까지 기다림, 
  // user-places.json 파일에 JSON으로 변한 places값을 추가함.
  await fs.writeFile('./data/user-places.json', JSON.stringify(places));

  res.status(200).json({ message: 'User places updated!' });
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);
