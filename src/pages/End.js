import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Card,CardGroup, Container} from 'react-bootstrap'

export default function End () {
    const costs = useSelector((state) => state.user_reducer.costs)
    
    console.log(JSON.parse(JSON.stringify(costs)),">>>>")

    return (
        <Container >
            <CardGroup style={{display: "flex", flexDirection:"column", justifyContent:"space-between", flexWrap:"wrap"}}>
            {costs.map(courier => {
                return courier.costs.map((cost,idx) => {
                    return(
                        <Card style={{ width: '400px', flex: "auto" }} key={idx}>
                            <Card.Body>
                                <Card.Title>{courier.code.toUpperCase()}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{JSON.stringify(cost.service)}</Card.Subtitle>
                                <Card.Text>
                                {cost.description}
                                </Card.Text>
                                
                            </Card.Body>
                            <Card.Footer style={{display: "flex", justifyContent:"space-around"}}>
                                <Card.Text >Rp {JSON.stringify(cost.cost[0].value)}</Card.Text>
                                <Card.Text >Hari: {cost.cost[0].etd}</Card.Text>
                            </Card.Footer>
                        </Card>
                    )
                })
            })}
            </CardGroup>
        </Container>
    )
};