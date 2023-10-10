import React, { useState } from 'react';
import './App.css';
import { FaceSDK } from '@face/sdk';

function App() {
  const [sdk] = useState(new FaceSDK());

  async function clickCreateWallet() {
    const address = await sdk.createWallet();
    console.log(address);
  }

  // todo: amount는 input으로 부터 받도록 수정되어야 합니다.
  async function clickSendTransaction() {
    const transactionHash = await sdk.sendTransaction('0');
    console.log(transactionHash);
  }

  return (
    <div className="App">
      <div className="box">
        <button className="btn" onClick={clickCreateWallet}>
          지갑 생성하기
        </button>
      </div>
      <div className="box">
        <div className="label">Amount</div>
        <div className="input-wrapper">
          <input type="number" className="input-text" placeholder="0.00" />
        </div>
        <button className="btn" onClick={clickSendTransaction} disabled>
          트랜잭션 전송하기
        </button>
      </div>
    </div>
  );
}

export default App;
