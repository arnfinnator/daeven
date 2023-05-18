import "../css/Footer.css";
const Footer = (props) => {
  return (
    <>
      <section className="footer">
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="#"></a> Email
            </li>
            <li>
              <a href="#"></a> Twitter
            </li>
            <li>
              <a href="#"></a> Linkdin
            </li>
          </ul>
          <h4>Other stuff</h4>
          <ul>
            <li>
              <a href="#">Use of cookies</a>
            </li>
            <li>
              <a href="#">Other stuff</a>
            </li>
            <li>
              <a href="#">Some more info</a>
            </li>
          </ul>
        </div>
        <div>
          <img
            src="https://www.catcareofvinings.com/blog/wp-content/uploads/2017/05/CCV_iStock-619079366-2000x1331.jpg"
            alt="Thinking cat"
          />
        </div>
      </section>
    </>
  );
};

export default Footer;
