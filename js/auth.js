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
            window.location = 'admin.html'
            return 
        }
    }
}

let obj = new App();
obj.check()



let error = document.querySelector('.error')
function validateForm(username, password, file){
    if(username.trim().length > 50 || username.trim().length < 3){
        error.textContent = 'Username must be between 3 and 50 characters'
        return false
    }else if(password.trim().length > 50 ||password.trim().length < 3){
        error.textContent = 'password must be between 4 and 50 characters'
        return false
    }else if(!file?.name){
        return error.textContent = 'File is required'
    }
    return true
}


submitButton.onclick = async (event) =>{
    event.preventDefault()
    if (validateForm(usernameInput.value, passwordInput.value, uploadInput.files[0])) {
        let formData = new FormData()
        const file = uploadInput.files[0]
        formData.append('username', usernameInput.value)
        formData.append('password', passwordInput.value)
        formData.append('file', file)
        console.log(formData);
        event.preventDefault()
    
        let response = await fetch('https://app-the-youtube.herokuapp.com/register', {
            method: 'POST',
            body: formData
        })
        response = await response.json()

        if (response.status == 201) {
            window.localStorage.setItem('user', JSON.stringify(response.user));
            window.localStorage.setItem('token', response.token);
            window.location = './index.html'
        }else{
            error.textContent = response.message
        }

    }else{
        return
    }

}
