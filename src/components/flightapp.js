import {useState} from 'react'
// import axios from 'axios'
import './Flightapp.css'

// Dummy Places
const suggestedPlaces = ['Chennai', 'Mumbai', 'Delhi', 'Hyderabad']

const Flightapp = () => {
  const [startPoint, setStartPoint] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [flightsList, setFlightsList] = useState([])
  const [message, setMessage] = useState('')
  const [startPointSuggestions, setStartPointSuggestions] = useState([])
  const [endPointSuggestions, setEndPointSuggestions] = useState([])

  const dummyData = [
    {
      id: 1,
      name: 'Air Indigo',
      price: 9050,
      availableDates: ['2023-07-23', '2023-07-24', '2023-07-25'],
      startingPoint: 'Hyderabad',
      endingPoint: 'Mumbai',
    },
    {
      id: 2,
      name: 'Deccan',
      price: 4580,
      availableDates: ['2023-07-23', '2023-07-25', '2023-07-26'],
      startingPoint: 'Hyderabad',
      endingPoint: 'Chennai',
    },
    {
      id: 3,
      name: 'Tata',
      price: 5550,
      availableDates: ['2023-07-25', '2023-07-26', '2023-07-27'],
      startingPoint: 'Delhi',
      endingPoint: 'Hyderabad',
    },
  ]

  const handleStartPointChange = e => {
    const value1 = e.target.value
    setStartPoint(value1)
    if (value1 === '') {
      setStartPointSuggestions([])
    } else {
      setStartPointSuggestions(
        suggestedPlaces.filter(place =>
          place.toLowerCase().includes(value1.toLowerCase()),
        ),
      )
    }
  }

  const handleEndPointChange = e => {
    const value2 = e.target.value
    setEndPoint(value2)

    if (value2 === '') {
      setEndPointSuggestions([])
    } else {
      setEndPointSuggestions(
        suggestedPlaces.filter(place =>
          place.toLowerCase().includes(value2.toLowerCase()),
        ),
      )
    }
    //  console.log(value)
  }

  const handleSearch = () => {
    /* try {
      const response = await axios.get('http://localhost:3004/api/flights', {
        params: {
          start: startPoint,
          end: endPoint,
          date: selectedDate,
        },
      })
      setFlightsList(response.data)
      setMessage(
        response.data.length > 0
          ? 'Available Flights'
          : 'No Fligths available for the selected date.',
      )
    } catch (error) {
      console.error('Error', error)
    }
        */

    const filteredVehicles = dummyData.filter(
      vehicle =>
        vehicle.availableDates.includes(selectedDate) &&
        vehicle.startingPoint
          .toLowerCase()
          .includes(startPoint.toLowerCase()) &&
        vehicle.endingPoint.toLowerCase().includes(endPoint.toLowerCase()),
    )
    setFlightsList(filteredVehicles)
    setMessage(flightsList.length > 0 ? '' : 'No Available FLights now')
    console.log(setFlightsList)
  }

  return (
    <div className="whole">
      <div className="date-and-place">
        <h1 className="head">Airport Transfer Booking App</h1>
        <div className="date-con">
          <div className="input-place-con">
            <label htmlFor="start" className="label-text">
              Starting Place:
            </label>
            <input
              id="start"
              type="text"
              value={startPoint}
              onChange={handleStartPointChange}
              placeholder="Starting Place"
            />
            {startPointSuggestions.length > 0 && (
              <ul className="data">
                {startPointSuggestions.map(place => (
                  <li
                    className="items"
                    onClick={() => {
                      setStartPointSuggestions([])
                      setStartPoint(place)
                    }}
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="input-place-con">
            <label htmlFor="end" className="label-text">
              Ending Place:
            </label>
            <input
              id="end"
              type="text"
              value={endPoint}
              onChange={handleEndPointChange}
              placeholder="Ending Place"
            />
            {endPointSuggestions.length > 0 && (
              <div className="data">
                {endPointSuggestions.map(place => (
                  <li
                    className="items"
                    key={place.id}
                    onClick={() => {
                      setEndPoint(place)
                      setEndPointSuggestions([])
                    }}
                  >
                    {place}
                  </li>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="input-place-con-date">
          <label htmlFor="date" className="label-text">
            Date:
          </label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            placeholder="30 JULY 2023"
          />
        </div>
      </div>

      <div className="but-con">
        <button onClick={handleSearch}>Search</button>
        <div>
          {flightsList.length > 0 ? (
            <ul>
              {flightsList.map(flight => (
                <li className="flight-details-con" key={flight.id}>
                  <h1>Flight Name-{flight.name} </h1>
                  <h1>Price: {flight.price}</h1>
                  <h1>Departure - {flight.startingPoint}</h1>
                  <h1>Arrival - {flight.endingPoint}</h1>
                </li>
              ))}
            </ul>
          ) : (
            <h1>{message} </h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default Flightapp
