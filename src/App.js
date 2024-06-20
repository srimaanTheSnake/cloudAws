import React, { useState, useEffect } from 'react';

import { Tabs, Tab, Form, Button, Table } from 'react-bootstrap';


const App = () => {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [ssn, setSsn] = useState('');
  const [age, setAge] = useState('');
  const [entity, setEntity] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [tradeName, setTradeName] = useState('');

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/people');
      setPeople(response.data);
    } catch (error) {
      console.error("There was an error fetching the people!", error);
    }
  };

  const addPerson = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/people', {
        name,
        ssn,
        age,
        entity,
        control_number: controlNumber,
        trade_name: tradeName
      });
      fetchPeople();
    } catch (error) {
      console.error("There was an error adding the person!", error);
    }
  };

  const deletePerson = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/people/${id}`);
      fetchPeople();
    } catch (error) {
      console.error("There was an error deleting the person!", error);
    }
  };

  return (
    <div>
      <h1>People Database</h1>
      <div>
        <h2>Add Person</h2>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <label>SSN:</label>
        <input type="text" value={ssn} onChange={(e) => setSsn(e.target.value)} /><br />
        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} /><br />
        <label>Entity:</label>
        <select value={entity} onChange={(e) => setEntity(e.target.value)}>
          <option value="">Select Entity</option>
          <option value="Palisades Medical Center">Palisades Medical Center</option>
        </select><br />
        <label>Control#:</label>
        <input type="text" value={controlNumber} onChange={(e) => setControlNumber(e.target.value)} /><br />
        <label>Trade Name:</label>
        <select value={tradeName} onChange={(e) => setTradeName(e.target.value)}>
          <option value="">Select Trade Name</option>
          <option value="Oxygen Blender">Oxygen Blender</option>
        </select><br />
        <button onClick={addPerson}>Add Person</button>
      </div>
      <h2>People</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SSN</th>
            <th>Age</th>
            <th>Entity</th>
            <th>Control#</th>
            <th>Trade Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.ssn}</td>
              <td>{person.age}</td>
              <td>{person.entity}</td>
              <td>{person.control_number}</td>
              <td>{person.trade_name}</td>
              <td><button onClick={() => deletePerson(person.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
