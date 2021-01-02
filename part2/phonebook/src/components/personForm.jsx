import React from 'react';

const PersonForm = (props) => {
    return (
        <>
            <form onSubmit={props.addPersonOrReplaceNumber}>
                <div>
                    name: <input onChange={props.onChangeName} value={props.newName || ''}/>
                </div>
                <div>
                    number: <input onChange={props.onChangeNumber} value={props.newPhoneNumber || ''}/>
                </div>
                <div>
                    <button
                        type="submit">add
                    </button>
                </div>
            </form>
        </>
    )
}

export default PersonForm;