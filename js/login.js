class App{
    async res(){
        let response = await fetch('https://app-the-youtube.herokuapp.com/admin', {
            method: 'GET',
            headers: {
                token: window.localStorage.getItem('token')
            }
        })
        response = await response.json()
        return response
    }

    async check(){
        let res = await this.res()
        if(res.message == 'true'){
            window.location = 'index.html'
            return 
        }
    }
}

let obj = new App();
setInterval(() => {
    obj.check()
}, 1000);
let error = document.querySelector('.error')

function validateForm(username, password){
    if(username.trim().length > 50 || username.trim().length < 3){
        error.textContent = 'Username must be between 3 and 50 characters'
        return false
    }else if(password.trim().length > 50 ||password.trim().length < 3){
        error.textContent = 'password must be between 4 and 50 characters'
        return false
    }
    return true
}

submitButton.onclick = async (event)=>{
    event.preventDefault()
    if (validateForm(usernameInput.value, passwordInput.value)) {
        let formData = new FormData()
        formData.append('username', usernameInput.value)
        formData.append('password', passwordInput.value)
        console.log(formData);
        event.preventDefault()
    
        let response = await fetch('https://app-the-youtube.herokuapp.com/login', {
            method: 'POST',
            body: formData
        })
        response = await response.json()
        event.preventDefault()

        if (response.status == 201 || response.status == 200) {
            window.localStorage.setItem('user', JSON.stringify(response.user));
            window.localStorage.setItem('token', response.token);
            window.location = './index.html'
        }else{
            error.textContent = response.message
        }
        event.preventDefault()

    }else{
        return
    }
}