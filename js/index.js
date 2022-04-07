const avatar = window.localStorage.getItem("avatar")
const avatarImg = document.querySelector('.avatar-img')
if(avatar){
    avatarImg.src = host+"/avatar/"+avatar
}
const members = document.querySelector("#members")
const searchBox = document.querySelector(".search-box")
const videosList = document.querySelector("#videosList")
const datalist = document.querySelector("#datalist")
const searchInput = document.querySelector(".search-input")
const microphone = document.querySelector("#microphone")

window.addEventListener("DOMContentLoaded",async () => {

    let users = await fetch(host + '/info')
        users = await users.json()
        renderUsers(users.users)
        renderVideos()
    searchBox.onsubmit = event => {
        event.preventDefault()
        searchInput.value.trim()
        if(searchInput.value !== "") {
            return renderVideos(false, searchInput.value)
        }
    }
    const voice = new webkitSpeechRecognition()

    voice.lang = 'uz-UZ'
    voice.continious = false

    voice.onresult = event => {
        searchInput.value = event.results[0][0].transcript
        return renderVideos(false, searchInput.value)
    }

    microphone.onclick = () => {
        voice.start()
    }
    voice.onaudioend = () => {
        voice.stop()
    }
    avatarImg.onclick = () => {
        if(!window.localStorage.token){
            window.location = "./register.html"
        }
        window.location = "./admin.html"
    }
    setInterval(async () => {
        let users = await fetch(host + '/info')
        users = await users.json()
        renderUsers(users.users)
        renderVideos()
    },5000)
})

function renderUsers(users) {
    if(JSON.stringify(renderUsers.users) === JSON.stringify(users)) return

    if(!renderUsers.users){
        renderUsers.users = users
    }
    if (users.length) {
        members.innerHTML = `<h1>YouTube Members</h1>
        <li class="channel active" onclick="main(this)">
        <a href="#">
        <svg viewbox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 30px;"><g><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8" class="style-scope yt-icon"></path></g></svg>
        <span>Home</span>
        </a>
        </li>`
        for (let user of users) {
            const [li,a,img,span] = createElements("li","a","img","span")
            li.classList.add("chanel")
            a.href = "#"
            img.setAttribute("src",`${host+'/avatar/'+user.avatar}`)
            img.alt = "chanel-icon"
            img.style.width = "30px"
            img.style.height = "30px"
            span.textContent = user.username

            a.append(img,span)
            li.append(a)
            members.append(li)

            li.onclick = async () => {
                const active = document.querySelector(".active")
                active.classList.remove("active")
                li.classList.add("active")
                window.localStorage.currentUser = user.userId
                renderVideos(user.userId)
            }
        }
    }
    renderUsers.users = users
}

function main(e){
    const active = document.querySelector(".active")
    active.classList.remove("active")
    e.classList.add("active")
    renderVideos()
}
async function renderVideos(currentUser,search) {
    let videos = await fetch(host + `/search?`+(currentUser?"userId="+currentUser:"")+ (search?"search="+search: ""))
    videos = (await videos.json()).videos

    if(JSON.stringify(renderVideos.videos) === JSON.stringify(videos)) return
    if(!renderVideos.videos){
        renderVideos.videos = videos
    }

    videosList.innerHTML = ""
    datalist.innerHTML = ""
    
    for (let video of videos) {
        if(!search) {
            let [option] = createElements("option")
            option.value = video.Title
            datalist.append(option)
        }
        videosList.innerHTML += `
        <li class="iframe">
            <video src=${host + "/videos/" + video.fileName} controls=""></video>
            <div class="iframe-footer">
                <img src="${host + "/avatar/" + video.user.avatar}" alt="channel-icon">
                <div class="iframe-footer-text">
                    <h2 class="channel-name">${video.user.username}</h2>
                    <h3 class="iframe-title">${video.Title}</h3>
                    <time class="uploaded-time">${video.Created}</time>
                    <a class="download" href="${host + "/video/" + video.fileName}" download>
                        <span>${video.size} MB</span>
                        <img alt="download" src="./img/download.png">
                    </a>
                </div>                  
            </div>
        </li>
        `
    renderVideos.videos = videos
    }
}


// function

// console.log("hello")