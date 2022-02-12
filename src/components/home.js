import React from "react";
import "./comp.css";
import slide1 from "../imgs/1s750a.jpg";
import slide2 from "../imgs/1s750b.jpg";
import slide3 from "../imgs/1s750c.jpg";

const delay = 7500;
const slides = [slide1, slide2, slide3];

function Home() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="Container">
      <div class="slider">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {slides.map((backgroundColor, index) => (
            <img className="slide" src={backgroundColor} key={index} />
          ))}
        </div>
        <div className="slideshowDots">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="stripLine">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid.
        </p>
        <button className="getStarted">Get Started</button>
      </div>
      <div className="socialMedia">
        <a className="faceBook" href="#">
          <i className="fa fa-facebook-f"></i>
        </a>
        <a className="instagram" href="#">
          <i className="fa fa-instagram"></i>
        </a>
        <a className="whatsapp" href="#">
          <i className="fa fa-whatsapp"></i>
        </a>
        <a className="twitter" href="#">
          <i className="fa fa-twitter"></i>
        </a>
      </div>
    </div>
  );
}

export default Home;
