import React, { useState, useEffect } from "react";
import People from "./components/People";
import "./index.css";
import Header from "./components/header";
import peopleService from "./components/services/people";
import axios from "axios";

const App = (props) => {
  // States
  const [people, setPeople] = useState([]);
  const [newPeople, setNewPeople] = useState("");
  const [newPeopleNum, setNewPeopleNum] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const[joke, setJoke] = useState("");
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, [])
  
  useEffect(() => {
   
    axios.get("https://api.jokes.one/jod").then((response) => {
     setJoke(response.data.contents.jokes[0].joke.text);
    });
  }, []);

  // Add people
  const addPeople = (event) => {
    // Prevent default.
    event.preventDefault();

    // Construct the object.
    const peopleObject = {
      name: newPeople,
      number: newPeopleNum,
      id: people.length + 1,
    };

    // Check if person.name exists in people.
    const check = people.find((person) => person.name === newPeople);

    // If it does, display alert.
    if (check) {
      alert(`${newPeople} is already added to phonebook`);
    }
    // If it doesn't, add the person to people.
    else {
      peopleService
      .create(peopleObject)
      .then(returnedPeople => {
        setPeople(people.concat(returnedPeople))
         setMessage({
          text: `Added ${returnedPeople.name}`,
          type: "success",
        });
        setTimeout(() => setMessage(null), 5000);
        setNewPeople('')
        setNewPeopleNum('')
      })
    }
  };

  // Handle input change.
  const handlePeopleChange = (event) => {
    console.log(event.target.value);
    setNewPeople(event.target.value);
  };
  const deletePerson = (id, name) => {
   
     if(window.confirm(`Are you sure you want to delete ${name}?`)) {
      peopleService.remove(id)
      setPeople(people.filter((person) => person.id !== id))
     }
   
    }
  //handle input change of number
  const handlePeopleNumChange = (event) => {
    setNewPeopleNum(event.target.value);
  };

  
  return (
  
    <div className="div-app-main">
      <Header joke={joke} message={message}/>
      <br/><br/>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <form onSubmit={addPeople}>
        <label>
          <b>Name:</b>
        </label>
        <br />
        <input type="text" value={newPeople} onChange={handlePeopleChange} required />
        <br />
        <br />
        <label>
          <b>Number:</b>
        </label>
        <br />
        <input value={newPeopleNum} type="number" onChange={handlePeopleNumChange} required />
        <button type="submit">Add</button>
      </form>
      <h2 className="main-h2-number">Numbers</h2>
      <ul>

        {people.filter((person) => {
          if (searchTerm == "") {
            return person;
          } else if (
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return person;
          }
        })
          .map((person) => (<People  deletePeople={deletePerson}key={person.id} people={person} />))
        }

      </ul>
    </div>
  );
};

export default App;
