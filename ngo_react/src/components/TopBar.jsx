export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-container">
        <div className="top-bar-left">
          <span><i className="fas fa-phone-alt"></i> +234-(0)-9117622762</span>
          <span><i className="fas fa-map-marker-alt"></i> Sokoto State, Nigeria</span>
        </div>
        <div className="top-bar-right">
          <span><i className="far fa-envelope"></i> saferplaceinitiativeng@gmail.com</span>
          <div className="top-bar-social">
            <a href="https://facebook.com/saferplaceinitiative" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com/saferplaceinitiative" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}

