const getToken = async () => {
   const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic Yzg5NGFhZTk3MjFhNGI5ZTkyNmI2ZjhmNWM0NzAwZDI6YWY1ZThiMDVlZGQ4NDMzMjgxMmZkMGExNTA0OTE4ZWY='
      },
      body: 'grant_type=client_credentials'
   });

   const data = await result.json();
   return data.access_token;
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

export const findAlbums = async (question, page) => {
     
   let token = await getToken();
   
   try {
      const np = page;
      const limit = 20;
      const url = `search?type=album&q=${question}&limit=${limit}&offset=${(np-1)*limit}`;
      
      let data = fetchTemplate(url);
      return await data;
   }

   catch (e) {
      alert(e);
   }
}

export const getTracks = async (id) => {

   try {
      const url = `albums/${id}/tracks`;

      let data = await fetchTemplate(url);
      return data.items;
   }

   catch (e) {
      alert(e);
   }
}