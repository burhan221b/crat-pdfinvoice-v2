import React from 'react';
import './styles/App.css';
import Ticket from './components/Ticket';
import Version from './components/Version';
import { INVOICE } from './utils/const';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Temporary Values for example
  const values = {
    ticket_type: INVOICE,
    logo: "",
    date: "",
    company: "",
    FROM_name: "",
    FROM_phone: "",
    FROM_email: "",
    FROM_address: "",
    TO_name: "",
    TO_phone: "",
    TO_email: "",
    TO_address: "",
    items: [],
    amount: "",
    tax: "",
    total: "",
    notes: ""
  }
  return (
    <div className="App">
      {/* Ticket */}
      {/* 
        * Invoice - Company/Singular
        * Quote - Company/Singular
        * Purchase Agreement
      */}
      <Ticket id={uuidv4()} prefill={values} />
      <Version />

    </div>
  );
}

export default App;
