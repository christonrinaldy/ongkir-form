import React, { useEffect, useState } from 'react'
import {Form, Button, Container, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {setProvinces, setCities,setCost} from '../store/function/requetRajaOngkir'
import {setAddress} from '../store/function/userFunction'
import ReactPlayer from 'react-player'


export default function Home ({history}) {
    
    const dispatch = useDispatch()
    const [destination,setDestination] = useState(null)
    const provinces = useSelector((state) => state.ongkirReducer.provinces)
    const cities = useSelector((state) => state.ongkirReducer.cities)
    const [inputCity,setCity] = useState('')
    const [filteredCity,setFilteredCity] = useState([])

    useEffect(() => {
        dispatch(setProvinces())
    },[])
    useEffect(() => {
        dispatch(setCities())
    },[])
    useEffect(() => {
        setFilteredCity(cities.filter((val) => {
            return val.city_name.toLowerCase().includes(inputCity.toLowerCase())
        }))
    },[inputCity,setCity,cities])
    useEffect(() => {
        if(destination !==null) {
            dispatch(setCost(destination.city_id))
        }
    }, [destination])

    function submitHandler () {
        dispatch(setAddress(destination.city_id))
        history.push('/thanks')
    }

    if(provinces.length === 0 || cities.length === 0) {
        return <>Loading...</>
    }
    return (
        <Container>
            <ReactPlayer url="https://www.youtube.com/watch?v=CAYDRIbXFAc" playing={true} wrapper={Container}/>
            <Form onSubmit = {(e) => submitHandler()}>
                <Form.Group >
                    <Form.Label>Nama</Form.Label>
                    <Form.Control type="text" placeholder="Masukkan nama Anda" required={true}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Alamat Email</Form.Label>
                    <Form.Control type="email" placeholder="Masukkan alamat email Anda" required={true}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>No. HP</Form.Label>
                    <Form.Control type="number" placeholder="contoh: 08121313313" required={true} min={9999999} max={99999999999} pattern={[0][8]}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Alamat Jalan</Form.Label>
                    <Form.Control type="text" placeholder="Masukkan alamat anda" required={true}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Kota/Kabupaten</Form.Label>
                        <Form.Control 
                            onChange = {(e) => {
                                setCity(e.target.value)
                                setDestination(null)
                            }} 
                            value={inputCity}
                            required={true}
                        />
                        <div style={{maxHeight:"400px",width:"auto",background:"white",position: "absolute",overflow:"auto" ,display: inputCity.length <= 1 || destination !== null ? "none" : "flex"}}>
                            <ul>
                                {filteredCity.map((val,index) => {
                                        return (
                                                <div key={index} onClick= {(e) => {
                                                        setDestination(val)
                                                        setCity(val.city_name)
                                                    }
                                                }>
                                                    <option style={{cursor:"pointer"}} onMouseOut={(e) => e.target.style.backgroundColor =""} onMouseOverCapture={(e) => e.target.style.backgroundColor ="cyan"}>{val.city_name}</option>
                                                </div>
                                                )
                                })}
                            </ul> 
                        </div>
                        
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Provinsi</Form.Label>
                        <Form.Control as="select" defaultValue="" required={true}>
                            <option key={0}>Choose...</option>
                            {provinces.map((value,index) => {
                                return(
                                    <option key={index} hidden={destination === null || value.province_id == destination.province_id ? false : true} selected={ destination === null? false : destination.province_id == value.province_id }>{value.province}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>
            </Form.Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}