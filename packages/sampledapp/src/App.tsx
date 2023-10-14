import React, { useMemo, useState } from 'react';
import './App.css';
import { FaceSDK } from '@face/sdk';

function App() {
  const sdk = useMemo(() => new FaceSDK(), []);
  const [amount, setAmount] = useState<string>('');

  async function clickCreateWallet() {
    const address = await sdk.createWallet();
    console.log('address', address);
  }

  async function clickSendTransaction() {
    const transactionHash = await sdk.sendTransaction(amount);

    if (!transactionHash) {
      console.log('the modal of send transaction is closed');
      return;
    }

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
          <input
            type="number"
            className="input-text"
            placeholder="0.00"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <button className="btn" onClick={clickSendTransaction} disabled={!amount}>
          트랜잭션 전송하기
        </button>
      </div>
    </div>
  );
}

export default App;
