import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Forms in React</h1>
      </header>
      <main>
        <div className="form-container">
          <RegistrationForm />
        </div>
        <hr />
        <div className="form-container">
          <FormikForm />
        </div>
      </main>
    </div>
  );
}

export default App;