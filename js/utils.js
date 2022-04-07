const backend = "https://app-the-youtube.herokuapp.com";
async function request(route, method, body){
	try{
		let headers = {
			token: window.localStorage.getItem('token')
		}
	
		if(!(body instanceof FormData)) {
			headers['Content-Type'] = 'application/json'
		}
	
		let response = await fetch(hostName + route, {
			method,
			headers,
			body: (body instanceof FormData) ? body : JSON.stringify(body)
		})
	
	
		if(response.status == 401){
			return await response.json()
		}
	
		if (![200, 201].includes(response.status)) {
			response = await response.json()
	
			return response
		}
	
		return await response.json()
	}catch(err){
		console.log(err)
	}
}

function createElements(...elements) {
    return elements.map(el => document.createElement(el))
}