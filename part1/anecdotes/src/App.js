import React, {useState} from 'react'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const getRandomAnecdote = () => {
        setSelected(getRandomInt(props.anecdotes.length))
    }

    const setVote = () => {
        const copyPoints = [...points];
        copyPoints[selected] += 1;
        setPoints(copyPoints);
    }

    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
            </div>
            <div>
                {props.anecdotes[selected]}
            </div>
            <div>
                has {points[selected]} votes
            </div>
            <div>
                <button onClick={setVote}>vote</button>
                <button onClick={getRandomAnecdote}>next anecdote</button>
            </div>
            <div>
                <h1>Anecdote with most votes</h1>
                <div>
                    {props.anecdotes[points.indexOf(Math.max(...points))]}
                    <div>
                      has {points[points.indexOf(Math.max(...points))]} votes
                    </div>

                </div>
            </div>
        </div>
    )
}

export default App;