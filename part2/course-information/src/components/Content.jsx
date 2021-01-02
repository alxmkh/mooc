import React from 'react';
import Part from "./Part";

const Content = (props) => {
    const parts = props.parts.map(part =>
        <Part key={part.id} part={part.name} exercise={part.exercises}/>
    );
    const totalExercises = props.parts.reduce((sum, exercise) => {
        return exercise.exercises + sum;
    }, 0);

    return (
        <>
            <div>
                {parts}
            </div>
            <div><b>total of {totalExercises} exercises</b></div>
        </>
    )
}

export default Content;