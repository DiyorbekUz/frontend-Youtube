hostname = 'https://app-the-youtube.herokuapp.com/'
let allUsers = ({username, photo_url}) =>{
    return `
    <a class="user" onclick="onclickk(this)" href="#">
        <img src="https://app-the-youtube.herokuapp.com/${photo_url}" alt="channel-icon" width="30px" height="30px">
        <span>${username}</span>
    </a>
        `
}


let userr = ({photo_url}) =>{
    return `
    <button type="button" onclick="voice()" class="voice-btn hover-after">
                    <svg viewbox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 30px;"><g><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></g></svg>
                </button>
                <button type="submit" class="search-btn hover-after">
                    <svg viewbox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 20px; height: 20px;"><g><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g></svg>
                </button>
                <button class="hover-after">
                    <svg viewbox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 30px;"><g><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path></g></svg>
                </button>
                <button class="hover-after">
                    <svg viewbox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 30px;"><g  ><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g></svg>
                </button>
                <button class="hover-after">
                    <svg viewbox="0 0 24 24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 24px;"><g><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></g></svg>
                </button>
                <a id="userr" href="./admin.html">
                    <img class="avatar-img" src="${hostname+photo_url}" alt="avatar-img" width="32px" height="32px">
                </a>
    `
}

let videoForm = ({username, userPhoto, videoUrl, videoTitle, videoSize, videoCreatedAt}) =>{
    return `
    <li class="iframe">
                        <video src="${hostname+videoUrl}" controls=""></video>
                        <div class="iframe-footer">
                            <img src="${hostname+userPhoto}" alt="channel-icon">
                            <div class="iframe-footer-text">
                                <h2 class="channel-name">${username}</h2>
                                <h3 class="iframe-title">${videoTitle}</h3>
                                <time class="uploaded-time">${videoCreatedAt}</time>
                                <a class="download" href="${hostname + 'download/' +videoUrl}"">
                                    <span>${Math.floor(videoSize / 1024 / 1024)} MB</span>
                                    <img src="./img/download.png">
                                </a>
                            </div>                  
                        </div>
                    </li>  
        `
}

let ourVideoList = ({videoUrl, videoTitle}) =>{
    return `
    <li class="video-item">
        <video src="${hostname+videoUrl}" controls=""></video>
        <p class="content" data-id="2" contenteditable="true">${videoTitle}</p>
        <img src="./img/delete.png" width="25px" alt="upload" class="delete-icon" data-id="2">
    </li>
        `
}