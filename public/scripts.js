const client_id = "c894aae9721a4b9e926b6f8f5c4700d2";
const client_secret = "af5e8b05edd84332812fd0a1504918ef";

const errorMessage = (error) => {
   document.querySelector('.popup').classList.add('open');
   document.querySelector('.popup__list').insertAdjacentHTML('beforeend', `<li class='popup__item'>${error.message}</li>`)

}

const fetchTemplate = async (url) => {
   let token = await getToken();
   const result = await fetch(`https://api.spotify.com/v1/` + url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      }
   })
   if (result.ok) {
      const data = await result.json();
      return data
   } else {

      if (result.status === 404) {
         throw new Error("There's no data. Try to reload page.")
      } else
         if (result.status === 401) {
            throw new Error
               ("Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.")
         } else
            if (result.status === 403) {
               throw new Error
                  ("Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here.")
            } else throw new Error("Something went wrong")

   }
}

const getToken = async () => {
   const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
   });

   const data = await result.json();
   return data.access_token;
}

const fillAlbums = async (data) => {
   let albums = document.querySelector('.content__found > .content__albums')
   albums.innerHTML = '';
   console.log(data)

   for (i = 0; i < data.albums.items.length; i++) {
      albums.insertAdjacentHTML('beforeend', `
         <div class="content__item">
            <img src='${data.albums.items[i].images[1].url}' data-id='${data.albums.items[i].id}' class="album-image">
            <div class="album-play">
               <img src="./img/play.svg" alt="" class="play">
            </div>     
            <h3 class="album-title">${data.albums.items[i].name}</h3>
            <p class="album-description">Дата релиза: ${data.albums.items[i].release_date}</p>
            <p class="album-description">${data.albums.items[i].artists[0].name}</p>
         </div>`
      )
   }
}

const findAlbums = async (question, page) => {    
   try {
      const limit = 20;
      const url = `search?type=album&q=${question}&limit=${limit}&offset=${(page-1)*limit}`;
      
      return await fetchTemplate(url);
   }

   catch (err) {
      errorMessage(err);
   }
}

const getTracks = async (id) => {

   try {
      const url = `albums/${id}/tracks`;

      let data = await fetchTemplate(url);
      return data.items;
   }

   catch (e) {
      errorMessage(e);
   }
}

document.querySelector('.content__albums').addEventListener('click', async (event) => {
   if (event.target.className === 'album-image') {
      let id = event.target.dataset.id
      let tracktlist = await getTracks(id)
      document.querySelector('.popup').classList.add('open')
      for (i = 0; i < tracktlist.length; i++) {
         document.querySelector('.popup__list').insertAdjacentHTML('beforeend', `<li class='popup__item'>${tracktlist[i].name}</li>`)
      }
   }
})

document.querySelector('.popup__close').addEventListener('click', (e) => {
   e.preventDefault()
   document.querySelector('.popup').classList.remove('open')
   document.querySelectorAll('.popup__item').forEach(e => e.remove())

})

document.querySelector('.header__searchBar').addEventListener('keyup', async (e) =>{
   if (e.keyCode != 13) return
   const question = document.querySelector('.header__search').value
   document.querySelector('.content__pageBackButton').classList.add('visible')
   document.querySelector('.content__pageForwardButton').classList.add('visible')

   document.querySelector('.content__found > .content__title').innerHTML='Найденные альбомы'
   document.querySelector('.content__pageNumber').innerHTML='1'

   let data = await findAlbums(question, 1)
   fillAlbums(data)
})

document.querySelector('.button-pageBack').addEventListener('click', async (e) => {
   let pageElem = document.querySelector('.content__pageNumber');
   let pageNum = Number(pageElem.innerHTML);
   if (pageNum == 1) return;

   const question = document.querySelector('.header__search').value
   pageNum -= 1;
   pageElem.innerHTML = String(pageNum);

   let data = await findAlbums(question, pageNum)
   fillAlbums(data)
})

document.querySelector('.button-pageForward').addEventListener('click', async (e) => {
   let pageElem = document.querySelector('.content__pageNumber');
   let pageNum = Number(pageElem.innerHTML);

   const question = document.querySelector('.header__search').value
   pageNum += 1;
   pageElem.innerHTML = String(pageNum);

   let data = await findAlbums(question, pageNum)
   fillAlbums(data)
})