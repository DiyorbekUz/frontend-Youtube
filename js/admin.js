const Title = document.querySelector("#videoInput")
const video = document.querySelector("#uploadInput")
const upload = document.querySelector("#upload")
const videosList = document.querySelector(".videos-list")

window.addEventListener("DOMContentLoaded",async () => {
    upload.addEventListener("submit",async (e) => {
        e.preventDefault()
        const title = Title.value?.trim()

        if(!title || !video.files?.[0]) return alert("Please chose title or video")

        let formData = new FormData()
        formData.append('Title', title)
        formData.append('video', video.files[0])

        let response = await fetch(host + "/video", {
            method: "POST",
            headers: {
                token,
            },
            body: formData
        })
        response = await response.json()
        if(!response.ok) alert(response.message)

        Title.value = ""
        video.files = null
        alert("Video uploaded")
        renderVideos()
    })
    renderVideos()
})
async function renderVideos() {
    let videos = await fetch(host + "/myvideos", {
        headers: {
            token,
        }
    })
    if(videos.status === 500) return window.location = "./login.html"
    videos = await videos.json()
    videosList.innerHTML = ""
    for(let video of videos.videos) {
        let li = document.createElement('li')
        let videoT = document.createElement('video')
        let p = document.createElement('p')
        let img = document.createElement('img')

        li.className = 'video-item'
        p.className = 'content'
        img.className = 'delete-icon'

        videoT.setAttribute('controls', true)
        videoT.setAttribute('src', host+ "/videos/"+ video.fileName)
        p.setAttribute('contenteditable', true)
        img.setAttribute('src', './img/delete.png')
        img.width = 25

        p.textContent = video.Title

        li.append(videoT, p, img)
        videosList.append(li)

        p.onkeydown = async (event) => {
            if (event.keyCode === 13 && p.textContent !== video.Title) {
                let response = await fetch(host+'/video', {
                    method: 'PUT',
                    headers: {
                        "Content-Type":"application/json",
                        token,
                    },
                    body: JSON.stringify({
                        videoId: video.videoId,
                        Title: p.textContent
                    })
                })
                response =await response.json()
                if(!response.ok)return alert(response.message)
            }
        }

        img.onclick = async () => {
            let response = await fetch(host+'/video',{
                method:"DELETE",
                headers: {
                    "Content-Type":"application/json",
                    token,
                },
                body: JSON.stringify({
                    videoId: video.videoId,
                })
            })
            response = await response.json()
            if(!response.ok) return alert(response.message)
            li.remove()
        }
    }
}