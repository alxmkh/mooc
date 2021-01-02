import React, {useState, useEffect} from 'react';
import shortid from 'shortid';
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import personsServices from './services/persons'
import Notification from "./components/notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [filterPersonArray, setFilterPersonArray] = useState([]);
    const [addMessage, setAddMessage] = useState(null);
    const [addErrorMessage, setAddErrorMessage] = useState(null);
    /* *****    WITH ASYNC / AWAIT   *****
    const getData = async () => {
        try {
            const result = await personsServices.getAll();
            await console.log(result);
            await setPersons(result);
        } catch (e) {
            await console.log(e);
        }
    }
    */
    useEffect(() => {
        personsServices.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
            .catch(err => {
                console.error(err);
            });
        /* *****    WITH ASYNC / AWAIT   *****
        getData();
        */
    },[addErrorMessage]);

    const handleChaneNameInput = (event) => {
        setNewName(event.target.value);
    }

    const handleChangeNumberInput = (event) => {
        setNewPhoneNumber(event.target.value);
    }

    const isPersonExist = (currentPerson) => {
        return persons.find(person => person.name === currentPerson);
    }

    const updatePerson = (event) => {
        event.preventDefault();
        if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            return false;
        }
        let currentPerson = persons.filter(person => person.name === newName)[0];
        const id = currentPerson.id;
        currentPerson = {...currentPerson, number: newPhoneNumber};
        personsServices.updatePersonPhoneNumber(id, currentPerson)
            .then(response => {
                setPersons(persons.map(person => person.id !== id ? person : response))
                setNewName('');
                setNewPhoneNumber('');
            })
            .catch(err => {
                console.error(err);
                setAddErrorMessage(
                    `Information of ${newName} has already been removed from server.`
                )
                setTimeout(() => {
                    setAddErrorMessage(null)
                    setPersons(persons.map(person => person.id !== id));
                }, 5000)
            })
    }

    const addPerson = (event) => {
        event.preventDefault();

        const newPersonObj = {
            name: newName,
            number: newPhoneNumber,
            id: persons[persons.length - 1].id + 1
        }

        personsServices.createPerson(newPersonObj)
            .then((person) => {
                setPersons(persons.concat(person));
                setAddMessage(
                    `Added '${newName}'.`
                )
                setTimeout(() => {
                    setAddMessage(null)
                }, 2000)
                setNewName('');
                setNewPhoneNumber('');
            })
            .catch(err => {
                console.error(err);
                alert(`Smth went wrong: ${err}`)
            })
    }

    const handleChaneSearchPerson = (event) => {
        if (event.target.value.length > 0) {
            const filteredPersons = persons.filter(person => {
                return person.name.toLowerCase().startsWith((event.target.value.toLowerCase()));
            }).map(person => <div key={shortid.generate()}> {person.name} {person.number} </div>);
            setFilterPersonArray(filteredPersons);
        } else {
            setFilterPersonArray([]);
        }
    }

    const deletePersonOnClick = (name, id, event) => {
        event.preventDefault();
        if (!window.confirm(`Delete ${name}?`)) {
            return;
        }
        const newPersonsList = persons.filter(person => person.id !== id);
        personsServices.deletePerson(id).then(() => {
            setPersons(newPersonsList);
        }).catch(err => {


        })
    }

    const personList = persons.map(person =>
        <div key={shortid.generate()}> {person.name} {person.number}
            {` `}
            <button
                onClick={(event) => deletePersonOnClick(person.name, person.id, event)}>delete
            </button>
        </div>
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={addErrorMessage} isError={true}/>
            <Notification message={addMessage} isError={false}/>
            <Filter onchange={handleChaneSearchPerson}/>
            <h2>add a new</h2>
            <PersonForm onChangeNumber={handleChangeNumberInput}
                        onChangeName={handleChaneNameInput}
                        newName={newName}
                        newPhoneNumber={newPhoneNumber}
                        addPersonOrReplaceNumber={!isPersonExist(newName) ? addPerson : updatePerson}/>
            <h2>Numbers</h2>
            <Persons filterPersonArray={filterPersonArray} personList={personList}/>
        </div>
    )
}

export default App;
