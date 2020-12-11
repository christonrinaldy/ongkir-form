var request = require("request")

var options = {
    method: 'GET',
    headers: {key: '3078eb5884a654943dbeb5ada5537651', 'content-type': 'application/x-www-form-urlencoded'},
  };
export function setProvinces () {
    
    return (dispatch,getState) => {
        
        fetch('https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/province', options)
        .then(async resp => {
            let body = await resp.text()
            let data = JSON.parse(body)
                dispatch({
                    type: 'SET_PROVINCES',
                    payload: {
                        provinces: data.rajaongkir.results
                    }
                })
        })
        .catch(err => {
            console.log(err)
        })
    }
}
export function setCities () {
    return (dispatch,getState) => {
        fetch('https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/city', options)
        .then(async resp => {
            let body = await resp.text()
            let data = JSON.parse(body)
                dispatch({
                    type: 'SET_CITIES',
                    payload: {
                        cities: data.rajaongkir.results
                    }
                })
        })
        .catch(err => {
            console.log(err)
        })
    }
}
export function setCost(cityId) {
    let couriers = ['jne','tiki','pos']
    let costs = []
   
      return (dispatch, getState) => {
        // const destinationId = getState().user_reducer.address
        var option1 = {
            method: 'POST',
            url: 'https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/cost',
            headers: {key: '3078eb5884a654943dbeb5ada5537651', 'content-type': 'application/x-www-form-urlencoded'},
            form: {origin: '455', destination: cityId, weight: 1000, courier: ''}
        };
        couriers.forEach(el => {
            option1.form.courier = el
            request(option1, function (error, response, body) {
                if (error) throw new Error(error);

                let data = JSON.parse(body)
                if(data.rajaongkir.status.code == 200) {
                        costs.push(data.rajaongkir.results[0])
                }
              });
        })
        dispatch({
            type: 'SET_COSTS',
            payload: {
                costs: costs,
                test: "test"
            }
        })
      }
      
}
