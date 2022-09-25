
import React from 'react'
import Axios from 'axios';
import { useState } from 'react';
import './App.css';


// BOOTSTRAP COMPONENTS IMPORT
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, ListGroup } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';



function App() {

// 1 get list of all police forces in uk
  const [dataForcesList, setDataForcesList] = useState([])
  const getForceData = () => {
    Axios.get("https://data.police.uk/api/forces").then((response) => {
      console.log(response.data)
      setDataForcesList(response.data)
    })
  }

// 2 get data about specific police force 
  const [dataForce, setForceData] = useState({})
  const getForceDetails = () => {
    Axios.get(`https://data.police.uk/api/forces/` + policeForce).then((response) => {
      //console.log(response.data.id, response.data.url, response.data.name, response.data.description )
      setForceData(response.data)
    })
  }

  // 3 get stop and serach data by police forcs
  const [stopSearchData, setStopSearchData] = useState([])
  const getStopSearch = () => {
    Axios.get(`https://data.police.uk/api/stops-force?force=` + forceStop + `&date=2022-` + month).then((response) => {
      console.log(response.data)
      setStopSearchData(response.data)
    })
  }

  // 4 get neighborhoods list 
  const [neighborhoodList, setNeighbourhoodList] = useState([])
  const getNeighbourhoods = () => {
    Axios.get(`https://data.police.uk/api/`+ neighbourhood +`/neighbourhoods`).then((response) => {
      console.log(response.data)
      setNeighbourhoodList(response.data)
    })
  }

  // 5 get crime categories
  const [crimeTypeList, setCrimeTypeList] = useState([])
  const getCrimeCategories = () => {
    Axios.get("https://data.police.uk/api/crime-categories").then((response) => {
      console.log(response.data)
      setCrimeTypeList(response.data)
    })
  }

  // 6 get data about crimes in city centers 
  const [crimeData, setCirmeData] = useState([])
  const getCrimeData = () => {
    Axios.get(`https://data.police.uk/api/crimes-street/` + crimeType + `?poly=` + centreCrimes +`&date=2022-` + month).then((response) => {
      console.log(response.data)
      setCirmeData(response.data)
    })
  }


 const [policeForce, setPoliceForce] = useState('');
 const [neighbourhood, setNeighbourhood] = useState('');
 const [month, setMonth] = useState('1');
 const [forceStop , setForceStop] = useState('');
 const [centreCrimes, setCentreCrimes] = useState('');
 const [crimeType, setCrimeType] = useState('');
 
//Modal ABOUT triggers
 const [show, setShow] = useState(true);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

  return (
    
    <div className="App">
      {/* NAVBAR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/} 
      <Navbar bg="secondary" varinat="dark" expand="lg"  >
            <Container>
              <Navbar.Brand href="#home">UK Police & crime stats</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home" onClick={handleShow}>About</Nav.Link>
                  <Nav.Link href="https://github.com/StaMike/reactApiApp.git" target='_blank'>GitHUB</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>    
      <Container>
   
      <Accordion className='mt-5'>
      {/* SPECIFIC POLICE FORCE OUTPUT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/} 
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={getForceData}>See police force details</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3" controlId="">
                <Form.Label>Choose Police Force</Form.Label>
                <Form.Select value = {policeForce} onChange={(e) => setPoliceForce(e.target.value)} aria-label="Police force details">
                {dataForcesList.map((forceInfo) => {
                  return  <option value={forceInfo.id}>{forceInfo.name}</option>
                })} 
                </Form.Select> 
                </Form.Group>
                <Button onClick={getForceDetails} variant="primary">See force details</Button> 
              </Form>
              <h3>{dataForce.name}</h3>
              <p><a href={dataForce.url}>{dataForce.name}</a></p>
              <div>{dataForce.description}</div>
            </Accordion.Body>
        </Accordion.Item>

        {/*  3 STOP AND SEARCH BY POLICE FORCE  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={getForceData}>Stop & Search by police force</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Label>See stop and search statistics by police force</Form.Label>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Select value = {forceStop}  onChange={(e) => setForceStop(e.target.value)}>
                      {dataForcesList.map((forceInfo) => {
                      return  <option value={forceInfo.id}>{forceInfo.name}</option>
                      })} 
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Select value = {month} onChange={(e) => setMonth(e.target.value)}>
                      <option value="01">Jan</option>
                      <option value="02">Feb</option>
                      <option value="03">Mar</option>
                      <option value="04">Apr</option>
                      <option value="05">May</option>
                      <option value="06">Jun</option>
                      <option value="07">Jul</option>
                      <option value="08">Aug</option>
                      <option value="09">Sept</option>
                      <option value="10">Oct</option>
                      <option value="11">Nov</option>
                      <option value="12">Dec</option>
                    </Form.Select>
                  </Form.Group>
              </Form>
              <Button onClick={getStopSearch}>See stop and serach statistics by police force</Button>
          
              {stopSearchData.map((searches) => {
              return <ListGroup>
                        <ListGroup.Item>{searches.gender} - {searches.age_range} - {searches.object_of_search} - {searches.legislation} - {/*searches.location.street.name*/} - {searches.outcome_object.name}</ListGroup.Item>
                      </ListGroup>
                })}
            </Accordion.Body>
          </Accordion.Item>

        {/* NEIGHBOURHOODS BY POLICE FORCE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={getForceData}>See neighborhood list by police force</Accordion.Header>
            <Accordion.Body>    
              <Form>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Choose police to see police neighbourhoods</Form.Label>
                    <Form.Select value = {neighbourhood} onChange={(e) => setNeighbourhood(e.target.value)}>
                    {dataForcesList.map((forceInfo) => {
                    return  <option value={forceInfo.id}>{forceInfo.name}</option>
                    })} 
                    </Form.Select>
                </Form.Group>
              </Form>
              <Button onClick={getNeighbourhoods}>See list of police neighbourhoods</Button>

            
              {neighborhoodList.map((neighbourhoodInfo) => {
              return  <ListGroup>
                        <ListGroup.Item><b>{neighbourhoodInfo.name} - {neighbourhoodInfo.id}</b></ListGroup.Item>
                      </ListGroup>
              })} 
            </Accordion.Body>
        </Accordion.Item>


        {/* CRIME STATISTICS  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}     
        <Accordion.Item eventKey="3">
          <Accordion.Header onClick={getCrimeCategories}>Crime statistics for 10 UK's main city centers </Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group className="mb-3" controlId="">
              <Form.Label>See crime statistics in 10 main city centers</Form.Label>
                <Form.Select value = {crimeType} onChange={(e) => setCrimeType(e.target.value)}>
                 {crimeTypeList.map((crime) => {
                    return <option value={crime.url}>{crime.name}</option>  
                  })}
                </Form.Select> 
              </Form.Group>
           
              <Form.Group className="mb-3" controlId="">
                <Form.Select value = {centreCrimes}  onChange={(e) => setCentreCrimes(e.target.value)}>
                  <option value="51.515,-0.133:51.494,-0.132:51.501,-0.090:51.514,-0.088">London</option>
                  <option value="52.480,-1902:52.483,-1.895:52.447,-1.893">Birmingham</option>
                  <option value="53.485,-2.248:53.474,-2.253:53.477,-2.225">Manchester</option>
                  <option value="53.803,-1.549:53.794,-1.562:53.791,-1.545:53.789,-1.533">Leeds</option>
                  <option value="54.977,-1.625:54.963,-1.618:54.969,-1.604:54.977,-1.610">Newcastle</option>
                  <option value="55.866,-4.242:55.852,-4.245:55.854,-4.269:55.869,-4.267">Glasgow</option>
                  <option value="53.397,-2.991:53.401,-2.974:53.412,-2.981:53:410,-2.997">Liverpool</option>
                  <option value="51.461,-2.591:51.448,-2.601:51.448,-2.584:51.461,-2.582">Bristol</option>
                  <option value="53.389,-1.473:53.374,-1.486:53.372,-1.460:53.388,-1.457">Sheffield</option>
                  <option value="55.957,-3.188:55.955,-3.219:55.943,-3.217:55.948,-3.176">Edinburgh</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Select value = {month} onChange={(e) => setMonth(e.target.value)}>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Aug</option>
                  <option value="09">Sept</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </Form.Select>
              </Form.Group>
            <Button onClick={getCrimeData} variant="primary">See crime statistics in 10 UK's biggest cities</Button>
            </Form>

              {crimeData.map((crimeInfo) => {
                return <Table striped bordered hover>
                          <tbody>
                            <tr>
                              <td>{crimeInfo.id}</td>
                              <td>{crimeInfo.category}</td>
                              <td>{crimeInfo.outcome_status.category}</td>
                              <td>{crimeInfo.location.street.name}</td>
                            </tr>
                          </tbody>
                        </Table>
                  })} 
          </Accordion.Body>
        </Accordion.Item>

        {/* POLICE FORCE LIST ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}       
        <Accordion.Item eventKey="4">
          <Accordion.Header onClick={getForceData}>List of all police forces in the UK</Accordion.Header>
          <Accordion.Body>
        
          {dataForcesList.map((forceInfo) => {
            return <Alert>{forceInfo.name} - ({forceInfo.id})</Alert>
          })}

          </Accordion.Body>
        </Accordion.Item>

        {/*  CRIME CATEGORIES  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}   
        <Accordion.Item eventKey="5">
          <Accordion.Header onClick={getCrimeCategories}>List of crime types</Accordion.Header>
          <Accordion.Body>
            
            {crimeTypeList.map((crime) => {
              return <Alert variant="danger">{crime.name}</Alert>
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>      

    {/*  ++++++++++++++  MODAL  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}  
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About the project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Project created as a part of jHUB coding scheme</h6><br></br>
          <p>
            App uses UK police APIs to provide some data about police forces and crime statistics, like: list of police forces,
            details about specific regional police, crime statistics for mayor city centers, stop and search statistics 
          </p>
          <p>React framework have been used along with Axios library to query the APIs. Frontend is Bootstrap framework based</p>
          
          <p>Copy rights: Mike Stasiak, 2022</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
  );
}

export default App;
