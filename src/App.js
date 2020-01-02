import React, { useState } from 'react';
import './App.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

function App() {

  const [address, setAddress] = useState("")
  const [coordinates, setCoordinates] = useState({lat: null, lng: null})

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    // console.log(results)
    setAddress(value)
    setCoordinates(latLng)
  }

  return (
    <div className="App">
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Lat: {coordinates.lat}</p>
            <p>Lng: {coordinates.lng }</p>

            <input {...getInputProps({ placeholder: "Type address" })} />

            <div>
              { loading ? <div>Loading...</div> : null }
            </div>

            { suggestions.map(suggestion => {

              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#ffffff"
              }

              return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
            }) }

          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default App;
