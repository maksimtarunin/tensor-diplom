import '../App.css';
import logo from '../img/logo.svg';
import home from '../img/home.svg';
import search from '../img/searchActive.svg';
import media from '../img/media.svg';
import create from '../img/create.svg';
import favourite from '../img/favourite.svg'

const Navbar = () => {
   return (
      <nav className="navigation">
         <div className="navigation-wrapper">
            <img src={logo} alt="logo" className="navigation-logo" />

            <ul className="navigation-list">
               <li className="navigation-item">
                  <a href="#" className="navigation-link">
                     <img className="navigation-icon" src={home} alt="icon" />
                     <span className="navigation-title">Главная</span>
                  </a>
               </li>
               <li className="navigation-item">
                  <a href="#" className="navigation-link active">
                     <img className="navigation-icon" src={search} alt="search" />
                     <span className="navigation-title">Поиск</span>
                  </a>
               </li>
               <li className="navigation-item">
                  <a href="#" className="navigation-link">
                     <img className="navigation-icon" src={media} alt="media" />
                     <span className="navigation-title">Моя медиатека</span>
                  </a>
               </li>
            </ul>

            <ul className="navigation-music">
               <li className="navigation-item">
                  <a href="#" className="navigation-link">
                     <img className="navigation-icon" src={create} alt="create" />
                     <span className="navigation-title">Создать плейлист</span>
                  </a>
               </li>
               <li className="navigation-item">
                  <a href="#" className="navigation-link">
                     <img className="navigation-icon" src={favourite} alt="favourite" />
                     <span className="navigation-title">Любимые треки</span>
                  </a>
               </li>
            </ul>
         </div>

      </nav>
   )
}

export default Navbar;