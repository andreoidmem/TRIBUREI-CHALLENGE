import { useState } from 'react';
import './App.css';

function App() {
  const [values, setValues] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value
    }));
    
  }

  const handleClickButton = () => {
    console.log("Button ", values);
  };


  return (
    <div className="app-container">
      <div className='register-container'>
        <h1 className='register-title'>Dados Cliente</h1>
        <input
          type='text'
          name='nome'
          placeholder='nome cliente'
          className='register-input'
          onChange={handleChangeValues}
        >

        </input>

        <input
          type='text' name='peso'
          placeholder='peso da entrega'
          className='register-input'
          onChange={handleChangeValues}
        >


        </input>

        <input
          type='text'
          name='endereço'
          placeholder='endereço cliente'
          className='register-input'
          onChange={handleChangeValues}
        >

        </input>
        <button className='register-button' onClick={() => handleClickButton()}>Cadastrar Cliente</button>
      </div>

    </div>
  );
}

export default App;
