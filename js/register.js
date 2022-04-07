const uploadInput = document.querySelector("#uploadInput")
const passwordInput = document.querySelector("#passwordInput")
const usernameInput = document.querySelector("#usernameInput")
const submitButton = document.querySelector("#submitBtn")


submitButton.onsubmit = async event => {
    event.preventDefault()

    let formData = new FormData()
    formData.append('username', usernameInput.value)
    formData.append('password', passwordInput.value)
    formData.append('avatar', uploadInput.files[0])

    let response = await fetch(host+'/register',{
        method: "POST",
        body: formData,
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