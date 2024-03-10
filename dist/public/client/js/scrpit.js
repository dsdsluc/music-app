// APlayer

const dataSong = document.querySelector("[data-song]")
const dataSinger = document.querySelector("[data-singer]");
if(dataSong && dataSinger){
    let song = dataSong.getAttribute("data-song");
    song = JSON.parse(song);
    let singer = dataSong.getAttribute("data-singer");
    singer = JSON.parse(singer);


    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        lrcType: 1,
        audio: [{
            name: song.title,
            artist: singer.fullName,
            url: song.audio,
            cover: song.avatar,
            lrc: song.lyrics
        }],
        autoplay: true
    });
    const spinAvatar = document.querySelector(".inner-song.white .inner-image");


    ap.on('play', function () {
        spinAvatar.style.animationPlayState = "running"
    });

    ap.on('pause', function () {
        spinAvatar.style.animationPlayState = "paused"
    });

    
    ap.on('ended', function () {

        const idSong = song._id
        const link = `/songs/listen/${idSong}`;
        const option = {
            method: "PATCH"
        }
        fetch(link,option)
            .then(res=>res.json())
            .then(data=>{
                const view = document.querySelector("[view] span");
                view.innerHTML = `${data.viewSong} Lượt nghe`
            })

    });

}

// End APlayer

// Button Like
const listbuttonLike = document.querySelectorAll("[button-like]");
if(listbuttonLike.length > 0){
    listbuttonLike.forEach((buttonLike)=>{
        buttonLike.addEventListener("click",()=>{
            const songId = buttonLike.getAttribute("song-id");
    
            const existActive = buttonLike.classList.contains("active");
    
            const typeLike = existActive ? ("dislike"):("like")
            
            const link = `/songs/like/${typeLike}/${songId}`;
    
            const option ={
                method: "PATCH"
            }   
    
            fetch( link, option)
                .then(res=>res.json())
                .then(data=>{
                    const span = buttonLike.querySelector("span");
                    span.innerHTML = `${data.like} Like`
                })
    
            buttonLike.classList.toggle("active") 
        })      
    
    })
  
}

// End Button Like
// Button Favorite
const listbuttonFavorite = document.querySelectorAll("[button-favorite]");
if(listbuttonFavorite.length > 0 ){
    listbuttonFavorite.forEach((buttonFavorite)=>{
        buttonFavorite.addEventListener("click",()=>{
            const songId = buttonFavorite.getAttribute("song-id");
    
            const existActive = buttonFavorite.classList.contains("active");
    
            const typeFavorite = existActive ? ("unfavorite"):("favorite")
            
            const link = `/songs/favorite/${typeFavorite}/${songId}`;
    
            const option ={
                method: "PATCH"
            }
    
            fetch( link, option)
    
            buttonFavorite.classList.toggle("active") 
        })
    })
}

// End Button Favorite

//Box Search 
const boxSearch = document.querySelector(".box-search");
if(boxSearch){
    const input = boxSearch.querySelector(`input[name="keyword"]`);
    const boxSuggest = boxSearch.querySelector(".inner-suggest");
    input.addEventListener("keyup",()=>{
        const value = input.value;
        
        const link = `/search/suggest?keyword=${value}`;

        fetch(link)
            .then(res => res.json())
            .then(data=>{
                const songs = data.songs
                if(songs.length > 0 ){
                    boxSuggest.classList.add("show");

                    const html = songs.map((item)=>{
                        return `
                        <a class="inner-item" href="/songs/detail/${item.slug}">
                            <div class="inner-image">
                                <img src="${item.avatar}" alt="${item.fullName}" />
                            </div>
                            <div class="inner-info">
                                <div class="inner-title">${item.title}</div>
                                <div class="inner-singer">
                                    <i class="fa-solid fa-microphone-lines"></i> ${item.inforSinger.fullName}
                                </div>
                            </div>
                        </a>
                        `  
                    })
                    const htmlString = html.join("");
                    const boxList = boxSuggest.querySelector(".inner-list");
                    boxList.innerHTML = htmlString
                }
                else{
                    boxSuggest.classList.remove("show");
                }
            })
    })
}

//End Box Search 

