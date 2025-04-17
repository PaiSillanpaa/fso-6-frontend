import { useEffect, useState } from "react";
import { getAll, create, update, remove } from "./services/notes";
import { Notification, ErrorNotification } from "./notification";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setErrorMessage] = useState(null);

  useEffect(() => {
    getAll()
      .then((response) => {
        console.log("Fetched persons: ", response.data);
        setPersons(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const newPerson = { name: newName, number: newNumber };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        update(existingPerson.id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response.data
              )
            );
            setMessage(`Updated ${newName}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.error("Error updating person ", error);
            setErrorMessage(
              `Information of ${newName} has already removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      create(newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error creating person ", error);
          setErrorMessage("Error creating person");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const handleDeletePerson = (id, name) => {
    if (
      window.confirm(`Are you sure you want to delete this contact ${name}?`)
    ) {
      remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage(`Deleted ${name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error deleting person ", error);
          setErrorMessage("Error deleting person");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const newArray = persons.filter((value) =>
    value.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <h2>Filter shown with</h2>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>debug: {filter}</div>
      <h2>Add new</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name:{" "}
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div>debug: {newName}</div>
        </div>
        <div>
          number:{" "}
          <input
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
          <div>debug: {newNumber}</div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Notification message={message} />
      <ErrorNotification message={error} />
      <table className="renderNames">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {newArray.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button
                  onClick={() => handleDeletePerson(person.id, person.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
