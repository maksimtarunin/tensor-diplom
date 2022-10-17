

const Popup = (props) => {
   const closePopup = (e) => {
      e.preventDefault();
      props.setOpenPopup(false)
   }

   return (
      <div className="popup">
         <div className="popup-body">
            <div className="popup-content">
               <ul className="popup-list">
                  {props.tracklist.map(item => (
                     <li key={item.id} className='popup-item'>{item.name}</li>
                  ))}
               </ul>
               <a href="" className="popup-close"
                  onClick={(e) => { closePopup(e) }}>Закрыть</a>
            </div>
         </div>
      </div>
   )
}

export default Popup