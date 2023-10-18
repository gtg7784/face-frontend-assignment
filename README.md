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

## @face/iframe

- iframe을 사용하여 지갑을 구현합니다.
- 앱과의 통신은 postMessage 를 사용합니다.

제공하는 기능은 크게 두가지입니다.

- create wallet
- send transaction

react-router-dom 의 Outlet 을 사용하여 Wrapper(`utils/router-wrapper.tsx``)를 만들고, 앱에서 지갑 관련 요청을 보냈을 때에 navigation 을 합니다. (ex. { type: 'createWallet } postMessage -> navigate to /create-wallet)

- ethers 와 관련된 처리는 `context/ethers.tsx` 의 `EthersProvider` 를 통해 처리합니다.

### Index (Wrapper)

- postMessage 의 각 type 에 따른 분기는 `hooks/iframe.ts` 의 `useIframeInitialization` hook 을 통해 처리합니다.

  - postMessage 를 통해 데이터를 다시 보내기 위해 필요한 requestId 는 `stores/iframe.ts` 의 `IframeStore` 를 통해 관리합니다.
  - send transaction 의 경우, postMessage 를 통해 to (트랜잭션을 보낼 주소), amount (트랜잭션을 보낼 양) 을 받아옵니다. 이 데이터들은 `stores/transaction.ts` 의 `TransactionStore` 를 통해 관리합니다.

### Create Wallet

- `pages/create-wallet.tsx` 에서 지갑을 생성합니다.
- `hooks/query.ts` 의 `useGetWallet` hook 을 통해 지갑을 가져옵니다. react-query 를 사용하여 캐싱을 합니다.
- `EthersProvider` 의 `getWallet` 을 통해 지갑을 생성합니다.

### Send Transaction

- `pages/send-transaction.tsx` 에서 트랜잭션을 전송합니다.
- `hooks/query.ts` 의 `useSendTransaction` hook 을 통해 유저에게 트랜잭션과 관련된 정보를 가져옵니다. react-query 를 사용하여 캐싱을 합니다.
- `stores/transaction.ts` 의 `TransactionStore` 를 amount 와 to 를 가져옵니다.
- fee 의 계산을 위해, `EthersProvider` 의 `estimateFee` 함수를 통해 fee 를 계산합니다.

Transaction 의 단계별 화면은 `components/template/send-transaction` 에서 구현합니다.

## @face/sdk

- `index.ts` 의 createWallet 과 sendTransaction 을 통해 `@face/iframe` 과 통신합니다.

## @face/ui

face 앱에서 사용되는 ui 컴포넌트를 제공합니다.

### storybook

`storybook` 을 통해 컴포넌트를 확인할 수 있습니다.

```sh
cd packages/ui
yarn storybook
```

http://localhost:6006 에서 확인할 수 있습니다.

- `components` 에서 컴포넌트를 확인할 수 있습니다.
- `styles` 에 `global style` 과 `theme` 을 확인할 수 있습니다.
