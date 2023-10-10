# Face Frontend Assignment

과제를 위한 프로젝트입니다.

nodejs 16을 사용하여 구현해주세요

## 패키지 설치 및 빌드

다음 명령어를 실행하여 프로젝트를 빌드합니다.

```
npm install
npx lerna bootstrap
npx lerna run build
```

## 실행 방법

다음 명령어를 실행하여 지갑을 실행합니다.
```
// sampledapp을 실행시키기 전에 iframe을 실행시킵니다.
cd packages/iframe
npm run start

cd packages/sampledapp
npm run start
```
http://localhost:3000에서 지갑 Template을 확인 할 수 있습니다.

## 과제 설명에 대한 글을 작성해주세요