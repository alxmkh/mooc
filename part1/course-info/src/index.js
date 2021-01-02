import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Header = (props) => {
    return (
        <h1>
            {props.course}
        </h1>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.exercise}
            </p>
        </div>
    )
}

const Content = (props) => {
    const parts = props.parts.map(part =>
        <Part key={} part={part.name} exercise={part.exercises}/>
    );

    return (
        <div>
            {parts}
        </div>
    )
}

const Total = (props) => {
    const totalEx = props.parts.reduce((total, arr) => total + (arr.exercises),0);
    return (
        <div>
            Number of exercises {totalEx}
        </div>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))