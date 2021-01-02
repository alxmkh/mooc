import React from 'react';

const Persons = (props) => {
    return (
        <>
            {props.filterPersonArray.length === 0 ? props.personList : props.filterPersonArray}
        </>
    )
}

export default Persons;