import React, { Component } from 'react'
import {init as firebaseInit} from './firebase'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 1000,
  margin: "0 auto",
}

const include = [
  "ARG", "BOL", "BRA", "CHL", "COL", "ECU",
  "GUY", "PRY", "PER", "SUR", "URY", "VEN",
]

const markers = [
  { markerOffset: -25, name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
  { markerOffset: -25, name: "La Paz", coordinates: [-68.1193, -16.4897] },
  { markerOffset: 35, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 35, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: 35, name: "Bogota", coordinates: [-74.0721, 4.7110] },
  { markerOffset: 35, name: "Quito", coordinates: [-78.4678, -0.1807] },
  { markerOffset: -25, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
  { markerOffset: -25, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
  { markerOffset: 35, name: "Paramaribo", coordinates: [-55.2038, 5.8520] },
  { markerOffset: 35, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
  { markerOffset: -25, name: "Caracas", coordinates: [-66.9036, 10.4806] },
]

class SimpleMarkers extends Component {
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ 
            scale: 205,
            rotation: [-11,0,0]
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[ 0, 20 ]}>
            <Geographies geography="/static/world-50m.json">
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  include.indexOf(geography.id) !== "ATA" && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#CFD8DC",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#FF5722",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                    />
                  )
                )
              }
            </Geographies>
            <Markers>
              {markers.map((marker, i) => (
                <Marker
                  key={i}
                  marker={marker}
                  style={{
                    default: { fill: "#FF5722" },
                    hover: { fill: "#FFFFFF" },
                    pressed: { fill: "#FF5722" },
                  }}
                  >
                  <circle
                    cx={0}
                    cy={0}
                    r={10}
                    style={{
                      stroke: "#FF5722",
                      strokeWidth: 3,
                      opacity: 0.9,
                    }}
                  />
                  <text
                    textAnchor="middle"
                    y={marker.markerOffset}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fill: "#607D8B",
                    }}
                    >
                    {marker.name}
                  </text>
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

class App extends Component {
  
  constructor(props) {
    super(props) 
    firebaseInit()   
  }
  
  componentWillMount() {
    console.log('will mount')
  }
  
  componentDidMount() {
    console.log('mounted')
  }
  state = {
    toggle: true
  }
  
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }
  
  render() {
    return (
      <div className="App">
      <header className="App-header">
      <Welcome text="Welcome to the Excelsior location map!" toggle={this.state.toggle}/>
      </header>
      <h2 className="App-intro">
      Or, how to avoid meeting garbage people when planning a trip ;-)
      </h2>
      {this.state.toggle && 
        <p>this should show and hide the markers on the map</p>
      }
      <button onClick={this.toggle}> Show / Hide  </button>
      <SimpleMarkers/>
      <AddNameForm/><RemoveNameForm/>
      </div>
    );
  }
}

class AddNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      location: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    alert(
      'Adding:' + '\n' +
      'Name: ' + this.state.userName + '\n' +
      'Location: ' + this.state.location
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <u><b>ADD NEW MARKER</b></u>
          <br />
          Name:
          <br />
          <input 
            name="userName" 
            type="text" 
            value={this.state.userName}
            onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Location:
          <br />
          <input
            name="location"
            type="text"
            value={this.state.location}
            onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class RemoveNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    alert(
      'Removing:' + '\n' +
      'Name: ' + this.state.userName + '\n'
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <br />
          <u><b>REMOVE MARKER</b></u>
          <br />
          Name:
          <br />
          <input 
            name="userName" 
            type="text" 
            value={this.state.userName}
            onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Welcome extends Component {
  render() {
    const { text, toggle} = this.props;
    console.log(toggle)
    return (
      <h1 className="App-title">{text}</h1>
    )
  }
}

export default App;
