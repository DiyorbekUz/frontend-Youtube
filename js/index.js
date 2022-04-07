class App{
    host = 'https://app-the-youtube.herokuapp.com/'
    allChannels = document.querySelector('#allChannels')
    header = document.querySelector('.header-right')

    videos = document.querySelector('.iframes-list')
    async getAllUsers(){
        let response = await fetch('https://app-the-youtube.herokuapp.com/users', {
            method: 'GET',
            headers: {
                token: window.localStorage.getItem('token')
            }
        })
        response = await response.json()
        return response
    }

    async getAllVideos(){
        let response = await fetch('https://app-the-youtube.herokuapp.com/videos', {
            method: 'GET',
            headers: {
                token: window.localStorage.getItem('token')
            }
        })
        response = await response.json()
        return response
    }

    async renderUsers(){
        let users = await this.getAllUsers()
        this.allChannels.innerHTML = ''

        for(let user of users){
            let el = allUsers(user)
            this.allChannels.innerHTML += el
        }

    }

    async renderAllVideos(searchValue=''){
        let allVideos = await this.getAllVideos()
        this.videos.innerHTML = ''
        datalist.innerHTML = ``
        if (!searchValue.trim()) {
            for(let video of allVideos){
                datalist.innerHTML += `<option value="${video.videoTitle}">`
                let el = videoForm(video)
                this.videos.innerHTML += el
            }
        }else{
            for(let video of allVideos){
                if(video.videoTitle.toLowerCase().includes(searchValue.toLocaleLowerCase())){
                    let el = videoForm(video)
                    this.videos.innerHTML += el
                }
            }
        }
    }

    async chooseUser(username){
        let response = await fetch('https://app-the-youtube.herokuapp.com/user/'+username, {
            method: 'GET',
            headers: {
                token: window.localStorage.getItem('token')
            }
        })
        response = await response.json()
        return response
    }

    async renderChooseUser(username){
        let vd = await this.chooseUser(username)
        this.videos.innerHTML = ''
        for(let video of vd){
            let el = videoForm(video)
            this.videos.innerHTML += el
        }
    }


    async renderUser(){
        let UserlocalStorage = JSON.parse(window.localStorage.getItem('user'))
        let el = userr(UserlocalStorage)
        this.header.innerHTML = el
    }

    
}

let obj = new App();
setInterval(() => {
    obj.renderUsers()
    obj.renderUser()
}, 1000);
obj.renderAllVideos()

function onclickk(event){
    obj.renderChooseUser(event.querySelector('span').textContent);
}



let searchInput = document.querySelector('.search-input')
let searchBtn = document.querySelector('.search-btn')
let datalist = document.querySelector('#datalist')
searchInput.onkeyup = (event) =>{    
    if(event.keyCode == 13){
        if (searchInput.value.trim()) {
            obj.renderAllVideos(searchInput.value)
        }else{
            obj.renderAllVideos()
        }
    }else

    if(!searchInput.value.trim()){
        obj.renderAllVideos()   
    }
}


function voice() {
	const voiceRecorder = new webkitSpeechRecognition()
	voiceRecorder.lang = 'uz-UZ'

	voiceRecorder.start()

	voiceRecorder.onresult = (event) => {
		searchInput.value = event.results[0][0].transcript
        obj.renderAllVideos(event.results[0][0].transcript)
	}

	voiceRecorder.onaudioend = () => {
		voiceRecorder.stop()
	}
}

searchInput.onkey