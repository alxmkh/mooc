import React from 'react'

const CapitalWeather = React.memo((props) => {
    const {capital, temperature, imgIcon, windSpeed, windDirection} = {...props};
    return (
        <>
            <div>
                <h3> Weather in {capital}</h3>
            </div>
            <div>
                <b>temperature: </b> {temperature} Celsius
            </div>
            <div>
                <img style={{width: 100}}
                     src={imgIcon}
                     alt={'weather icons'}/>
            </div>
            <div>
                <b>wind: </b>{windSpeed} mph direction {windDirection}
            </div>
        </>
    )
});

export default CapitalWeather;