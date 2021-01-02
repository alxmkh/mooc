import React, {useEffect, useState} from 'react';
import axios from "axios";
import shortid from "shortid";
import CountryInfo from './components/CountryInfo'


const App = React.memo(() => {
    const [countryName, setCountryName] = useState('');
    const [countries, setCountries] = useState([]);
    const [visible, setVisible] = useState(false);
    const [indexValue, setIndexValue] = useState(-1);
    useEffect(() => {
        setVisible(false);
        if (countryName !== '') {
            axios
                .get(`https://restcountries.eu/rest/v2/name/${countryName}`)
                .then((response) => {
                    setCountries(response.data.map(item => item));
                }).catch(err => {
            })
        }
    }, [countryName]);

    const showCountryInfo = (index) => {
        setIndexValue(index);
        setVisible(!visible);
    }
    const printCountries = countries.map((item, index) => <div key={shortid.generate()}> {item.name}
        <button onClick={() => showCountryInfo(index)}>show</button>
    </div>)

    return (
        <>
            <div>
                find countries <input onChange={(e) => setCountryName(e.target.value)}/>
            </div>
            {countries.length === 1 ? <CountryInfo countries={countries} index={0}/> : null}
            {countries.length > 10
                ? <div>Too many matches, specify another filter</div>
                : null}
            {countries.length > 1 && countries.length <= 10
            ? printCountries
            : null}
            {visible ? <CountryInfo countries={countries} index={indexValue}/> : null}
        </>
    )
})

export default App;