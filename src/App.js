import React, { useState } from 'react';
import Modal from './components/Modal';
import './index.scss';



function App() {
  const [modal, setModal] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setModal(true)} className="open-modal-btn">✨ Открыть окно</button>

      <Modal modal={modal} setModal={setModal}>
        <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" />
        <h3>Это модальное окно</h3>
        Сюда можно писать что угодно, т.к. у модал есть children
      </Modal>

    </div>
  );
}

export default App;
