## CORS(Cross-Origin-Resource-Sharing)
> 브라우저에서 다른 출처의 리소스를 공유하는 방법이다. 
- 출처(Origin)란
-- Protocol, Host, Port를 합친 것.
-- location.origin으로 확인 가능.
- 동일 출처 정책(Same-Origin-Policy)란
-- 다른 서버에서 API를 호출할 땐 정상적이지만 브라우저에서 API를 호출할 때 오류를 냄.
-- 이유는 다른 출처의 리소스 접근을 금지하고 있기 때문임.
-- 서버간 통신은 괜찮음.
- Simple Request
-- 브라우저에서 요청한 Origin과 서버에서 응답한 Access-Control-Allow-Origin을 비교하여 유효한지 확인.
-- 조건
1. 요청의 메소드는 GET, HEAD. POST중 하나
2. Accept, Accept-Language, Content-Language, Content-Type, DRP, Downlink, Save-Data, Viewport-Width, Width를 제외한 헤더를 사용하면 안됨
3. Content-Type은 application/x-www-form-urlencoded, multipart/form-data, text/plain만 허용
- Prefight request
-- 서버에 예비 요청을 보내서 안전한지 판단한 후 본 요청을 보내는 방법.
-- 예비요청을 Preflight이라 하고 HTTP 메소드 중 OPTIONS 메소드가 사용됨.
- Credentialed Request
-- 인증된 요청을 사용하는 방법.
-- XMLHttpRequest 객체나 fetch API는 별도의 옵션 없이 브라우저의 쿠키 정보나 인증과 관련된 헤더를 요청에 담지 않는다.
-- 요청에 인증과 관련된 정보를 담을 수 있게 해주는 credentials 옵션이 있음.

|옵션값|설명|
|----------------|-------------------------------|-----------------------------|
| same-origin(기본값) | 같은 출처 간 요청에만 인증 정보를 담을 수 있다. |
| include | 모든 요청에 인증 정보를 담을 수 있다 |
| omit | 모든 요청에 인증 정보를 담지 않는다. | 