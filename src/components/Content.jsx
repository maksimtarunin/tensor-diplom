import { useEffect, useState } from 'react';
import { findAlbums, getTracks } from '../api/api.js';
import play from '../img/play.svg'
import leftButton from '../img/leftButton.svg'
import rightButton from '../img/rightButton.svg'
import menu from '../img/menuButton.svg'
import '../App.css';
import Popup from './Popup';


const Content = () => {
   let [albums, setAlbums] = useState([]);
   let [openPopup, setOpenPopup] = useState(false);
   let [tracklist, setTracklist] = useState([]);
   let [pending, setPending] = useState(false)
   let [searchValue, setSearchValue] = useState('');
   let [page, setPage] = useState('1');

   const searchAction = async(e) => {
      if(e.key != "Enter") return;
      const searchData = await findAlbums(searchValue, 1);
      let data = searchData.albums.items;
      setAlbums(data);
      setPage(1);
   };

   const pageForwardAction = async() => {
      if (page == 50) return;
      const searchData = await findAlbums(searchValue, page + 1);
      setPage(page+1);
      let data = searchData.albums.items;
      setAlbums(data);
   }

   const pageBackAction = async() => {
      if (page == 1) return;
      const searchData = await findAlbums(searchValue, page-1);
      setPage(page-1);
      let data = searchData.albums.items;
      setAlbums(data);
   }

   const setTracks = async (id) => {
      setPending(true);
      let result = await getTracks(id);
      setTracklist(result);
      setOpenPopup(true);
      setPending(false);
   }

   return (
      <>
      <header className="header">
         <div className="header-back-forward">
            <div className="header-back-button">
               <button className="button-back"><img src={leftButton} alt="button-back" /></button>
            </div>
            <div className="header-forward-button">
               <button className="button-forward"><img src={rightButton} alt="button-forward" /></button>
            </div>
            <div className="header-searchBar">
               <input type="text" placeholder="What do you want to listen to?" maxLength="800" className="header-search"
               onChange={(e) => setSearchValue(e.target.value)} value={searchValue} onKeyPress={(e) => searchAction(e)}></input>
            </div>
         </div>

         <div className="header-user">
            <span className="username">Username</span>
            <img src={menu} alt="" />
         </div>
      </header>
      <main className="content">
         <div className="content-found">
            <h2 className="content-title">Найденные альбомы</h2>
            <div className="content-page">
               <div className = "content-pageBackButton">
                  <button className="button-pageBack" onClick={pageBackAction}><img src={leftButton} alt="button-pageBack" /></button>
               </div>
               <div className = "content-pageNumber">{page}</div>
               <div className = "content-pageForwardButton">
                  <button className="button-pageForward" onClick={pageForwardAction}><img src={rightButton} alt="button-pageForward" /></button>
               </div>
            </div>
            <div className="content-albums">
               {albums.map(item => (
                  <div className="content-item" key={item.id}>
                     <img
                        src={item.images[1].url}
                        onClick={!pending && (() => { setTracks(item.id) })}
                        className="album-image" />
                     <div className="album-play">
                        <img src={play} alt="" className="play" />
                     </div>
                     <h3 className="album-title">{item.name}</h3>
                     <p className="album-description">Дата релиза: {item.release_date}</p>
                  </div>
               ))}
            </div>
         </div>

         {openPopup && <Popup tracklist={tracklist} setOpenPopup={setOpenPopup} />}
      </main>
      </>
   )
}

export default Content;