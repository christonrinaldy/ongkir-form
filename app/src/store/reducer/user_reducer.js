let initial_state = {
    costs: [],
    address: null,
    weight: 1000,
    test: ''
}

export default function userReducer (state = initial_state, action) {
    switch (action.type) {
        case 'SET_ADDRESS':
            const new_address = action.payload.address
            state.address = new_address
            return {...state}
        case 'SET_COSTS':
            const new_costs = action.payload.costs
            state.costs = new_costs
            const new_test = action.payload.test
            state.test = new_test
            return {...state}
        default:
            return {...state}
    }
}