import axios from "axios";
import shortid from "shortid";
import React, {useEffect, useState} from "react";
import CapitalWeather from "./CapitalWeather";

const CountryInfo = React.memo((props) => {
    const BASE_URL_WEATHER_API = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=`;
    const [temperature, setTemperature] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [imgIcon, setImgIcon] = useState('');
    const [windDirection, setWindDirection] = useState('');
    const getCapital = () => {
        return props.countries[props.index].capital ? props.countries[props.index].capital : '';
    }
    const [capital] = useState(getCapital());
    useEffect(() => {
        axios.get(BASE_URL_WEATHER_API + capital)
            .then((response) => {
                setTemperature(temperature !== '' ? response.data.current.temperature : '[no data]');
                setWindSpeed(windSpeed !== '' ? response.data.current.wind_speed : '[no data]');
                setImgIcon(imgIcon !== '' ? response.data.current.weather_icons[0] : '[no data]');
                setWindDirection(windDirection !== '' ? response.data.current.wind_dir : '[no data]');
            })
    })

    return (
        <div key={shortid.generate()}>
            <h2> {props.countries[props.index].name} </h2>
            <div> capital {props.countries[props.index].capital}</div>
            <div> population {props.countries[props.index].population}</div>
            <h3> Spoken languages</h3>
            <div>
                <ul>
                    {props.countries[props.index].languages.map(lang => <li key={shortid.generate()}>{lang.name}</li>)}
                </ul>
            </div>
            <div>
                <img style={{width: 100}}
                     src={props.countries[props.index].flag}
                     alt={'country flag'}/>
            </div>
            <CapitalWeather
                capital={capital}
                temperature={temperature}
                imgIcon={imgIcon}
                windSpeed={windSpeed}
                windDirection={windDirection}
            />
        </div>
    )
})

export default CountryInfo;