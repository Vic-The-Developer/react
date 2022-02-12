import React from "react";
import './comp.css';

class Contact extends React.Component {
    render() {
       return (
          <div>
              <div className="heading">
                    <h3>GET IN TOUCH WITH US</h3>
                    <p>Contact us for any enquiry or suggestion. Thank you!</p> 
              </div>
              <div className="socials">
                  <a className="call" href="#">
                      <i class="fa fa-phone-alt"></i>
                  </a>
                  <a className="whatsapp" href="#">
                      <i class="fa fa-whatsapp"></i>
                  </a>
                  <a className="gmail" href="#">
                      <i class="fa fa-envelope"></i>
                  </a>
                  <a className="location" href="#">
                      <i class="fa fa-map-marker-alt"></i>
                  </a>
              </div>
             <form className="messageUs">
                    <div class="mb-3">
                        <label for="fullName" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="fullName" ref={this.nameInputRef}/>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" ref={this.emailInputRef}/>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" id="message" ref={this.messageInputRef}></textarea>
                    </div>
                    <div className="buttonLink">
                        <button type="submit" class="btn btn-primary">Send</button>
                    </div>
            </form>
          </div>
       )
    }
}

export default Contact;