let initial_state = {
    provinces: [],
    cities: [],
    courier: ['jne', 'pos', 'tiki']
}

export default function rajaOngkir (state = initial_state, action) {
    switch (action.type) {
        case 'SET_PROVINCES':
            const provinces = action.payload.provinces
            state.provinces = provinces
            return {...state}
        case 'SET_CITIES':
            const cities = action.payload.cities
            state.cities = cities
            return {...state}
        default:
            return state
    }
}