class App{
    videoslist = document.querySelector('.videos-list')
    videoInput = document.querySelector('#videoInput')
    uploadInput = document.querySelector('#uploadInput')
    async res(){
        let response = await fetch('https://app-the-youtube.herokuapp.com/admin', {
            method: 'GET',
            headers: {
                token: window.localStorage?.getItem('token') || ''
            }
        })
        response = await response.json()
        return response
    }

    async check(){
        let res = await this.res()
        if(res.message == 'true'){
            return 
        }else{
            window.location = 'register.html'
        }
    }

    async ourVideos(){
        let response = await fetch('https://app-the-youtube.herokuapp.com/videos', {
            method: 'GET',
            headers: {
                token: window.localStorage.getItem('token')
            }
        })
        response = await response.json()
        return response
    } 

    async renderOurVideo(){
        let vid = await this.ourVideos()
        let UserlocalStorage = JSON.parse(window.localStorage.getItem('user'))
        this.videoslist.innerHTML = ''
        for(let video of vid){
            if (video.username == UserlocalStorage.username) {
                let el = ourVideoList(video)
                this.videoslist.innerHTML += el
                let deleteImg = document.querySelector('.delete-icon')
                let p = document.querySelector('.content')
                
                deleteImg.onclick = async () => {
                    console.log(video.videoId);
                    const response = await fetch('https://app-the-youtube.herokuapp.com/videos', {
                        method: 'DELETE', 
                        headers: {
                            token: window.localStorage?.getItem('token') || '',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            videoId: video.videoId
                        })
                    });
                    if(response.status != 200 && response.status != 201){
                        alert(response.message)
                    }
                }

                p.onkeydown = async (event) => {
                    if(event.keyCode == 13 && p.textContent.trim()) {
                        const response = await fetch('https://app-the-youtube.herokuapp.com/videos', {
                            method: 'PUT', 
                            headers: {
                                token: window.localStorage?.getItem('token') || '',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                videoId: video.videoId,
                                videoTitle: p.textContent
                            })
                        })

                        if(response.status != 200 && response.status != 201){
                            alert(response.message)
                        }
                    }
                }

            }
            
        }
    }


}

let obj = new App();
obj.check()
obj.renderOurVideo()

function validateForm(videoTitle, file){
    if(videoTitle.trim().length > 50 || videoTitle.trim().length < 3){
        alert('videoTitle must be between 3 and 50 characters')
        return false
    }else if(!file?.name){
        return alert('File is required')
    }
    return true
}


submitButton.onclick = async event =>{
    event.preventDefault()
    if (validateForm(obj.videoInput.value, uploadInput.files[0])) {
        let formData = new FormData()
        let UserlocalStorage = JSON.parse(window.localStorage.getItem('user'))
        const file = uploadInput.files[0]
        formData.append('videoTitle', obj.videoInput.value)
        formData.append('userPhoto', UserlocalStorage.photo_url)
        formData.append('username', UserlocalStorage.username)
        formData.append('file', file)
        event.preventDefault()
    
        let response = await fetch('https://app-the-youtube.herokuapp.com/videoupload', {
            method: 'POST',
            body: formData
        })
        response = await response.json()

        if (response.status != 201) {
            alert(response.message)
        }

    }else{
        return
    }
}

