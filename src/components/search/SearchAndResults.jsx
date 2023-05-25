import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const SearchAndResults = ({stations, setCoords}) => {
    const [searchWords, setSearchWords] = useState("");
    const [foundStations, setFoundStations] = useState([]);

    const handleSearch = () => {
        console.log(searchWords)
        if(searchWords) {
            let filteredStations = stations.filter(station => station.name.toLowerCase().includes(searchWords.toLowerCase()));
            setFoundStations(filteredStations)
            console.log(filteredStations)
        }
    }

    const handleResultClick = (coordinates) => {
        setCoords(coordinates)
    }

    return (
        <div className="">
            <Form>
                <Row className="mb-2">
                <Form.Group as={Col} className="mb-3 me-2" controlId="search">
                    <Form.Control onChange={e => setSearchWords(e.target.value )}  type="text" placeholder="Buscá tu estación" />
                    <Form.Text  />
                </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="search">
                <Button onClick={handleSearch} variant="primary" >
                    Buscar
                </Button>
                    </Form.Group>
                </Row>
            </Form>

            <div>
                {foundStations && foundStations.map(station => {
                    return (      <div>
                        <Button className="boton"  onClick={() => handleResultClick(station.coordinates)} > {station.name} </Button>
                    </div>)


                })}
            </div>
    </div>)
}
