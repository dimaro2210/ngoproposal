export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-container">
        <div className="top-bar-left">
          <span><i className="fas fa-phone-alt"></i> +(234) 806-024-9813</span>
          <span><i className="fas fa-map-marker-alt"></i> Abuja, Nigeria</span>
        </div>
        <div className="top-bar-right">
          <span><i className="far fa-envelope"></i> info@chariusngo.org</span>
          <div className="top-bar-social">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}
