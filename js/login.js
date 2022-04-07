const usernameInput = document.querySelector("#usernameInput")
const passwordInput = document.querySelector("#passwordInput")
const LoginBtn = document.querySelector("#LoginBtn")

LoginBtn.onsubmit = async event => {
    event.preventDefault()

    let user = {
        username: usernameInput.value,
        password: passwordInput.value
    }

    let response = await fetch(host+'/login',{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user),
    })
    response = await response.json()
    if(!response.ok) return alert(response.message)


    window.localStorage.setItem('token', response.token)

    window.localStorage.setItem('avatar', response.user.avatar)

    window.location = './index.html'
}
const showButton = document.querySelector("#showButton")
showButton.onclick = () => {
    passwordInput.type = passwordInput.type === 'password' ? "text": "password"
}