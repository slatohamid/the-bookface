import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        <p class="quote">
          Good Friends are Like Stars, You Don't Always See Them but You Know
          They're Always There...
        </p>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
        <Link to="/">Terms</Link>
        <Link to="/">Help</Link>
      </div>
      <div className="login_footer_wrap">
        <Link to="/" style={{fontSize: "12px", marginTop: "20px"}}>
          FriendLink © 2024
        </Link>
      </div>
    </footer>
  );
}
