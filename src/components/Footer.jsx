const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundColor: "rgb(99 100 107)", color: "white" }}
    >
      <div className="container">
        <div className="row p-5">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              {/* <div className="footer__logo">
                <a href="#">
                  <i class="bi bi-instagram"></i>
                </a>
              </div> */}
              <p>
                The customer is at the heart of our unique business model, which
                includes design.
              </p>
              {/* <a href="#">
                <i class="bi bi-credit-card"></i>
              </a> */}
            </div>
          </div>
          <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>Shopping</h6>
              <ul>
                <li>
                  <a href="#">Clothing Store</a>
                </li>
                <li>
                  <a href="#">Trending Shoes</a>
                </li>
                <li>
                  <a href="#">Accessories</a>
                </li>
                <li>
                  <a href="#">Sale</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6">
            <div className="footer__widget">
              <h6>Shopping</h6>
              <ul>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Payment Methods</a>
                </li>
                <li>
                  <a href="#">Delivary</a>
                </li>
                <li>
                  <a href="#">Return & Exchanges</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
            <div className="footer__widget">
              <h6>NewLetter</h6>
              <div className="footer__newslatter">
                <p>
                  Be the first to know about new arrivals, look books, sales &
                  promos!
                </p>
                <form>
                  <input type="text" placeholder="Your email" />
                  <button type="submit">
                    <i class="bi bi-envelope"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
