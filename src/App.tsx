import { useState } from 'react';
import './App.css';
import Form from './components/Forms/FormControled/Form';
import Modal from './components/Modal/Modal';

function App() {
  const [openControlled, setOpenControlled] = useState(false);
  const [openUncontrolled, setOpenUncontrolled] = useState(false);

  return (
    <>
      <div>
        {!openControlled && !openUncontrolled && (
          <div className="formOpenButtons">
            <button
              className="formButton"
              onClick={() => setOpenControlled(true)}
            >
              Controlled Form
            </button>
            <button
              className="formButton"
              onClick={() => setOpenUncontrolled(true)}
            >
              Uncontrolled Form
            </button>
          </div>
        )}

        <Modal isOpen={openControlled} onClose={() => setOpenControlled(false)}>
          <Form />
        </Modal>

        <Modal
          isOpen={openUncontrolled}
          onClose={() => setOpenUncontrolled(false)}
        >
          <div>Uncontrolled Form (to be implemented)</div>
        </Modal>
      </div>
    </>
  );
}

export default App;
