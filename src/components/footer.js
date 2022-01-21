import React from "react";
import './comp.css'

function Footer(){
    return <footer class="page-footer font-small blue pt-4">
        <div class="container-fluid text-center text-md-left">
            <div class="row">
                <div class="col-md-6 mt-md-0 mt-3">
                    <h5 class="text-uppercase">React Project</h5>
                    <p>
                        <i>Tetx</i>
                    </p>
                </div>
                <hr class="clearfix w-100 d-md-none pb-3"/>
                <div class="col-md-3 mb-md-0 mb-3">
                    <h5 class="text-uppercase">Contacts</h5>
                    <ul class="list-unstyled links">
                        <li>
                            <a href="#!">
                                <i className="fa fa-envelope"></i>&nbsp;&nbsp;Email
                            </a>
                        </li>
                        <li>
                            <a href="#!">
                                <i className="fa fa-map-marker-alt"></i>&nbsp;&nbsp;Location
                            </a>
                        </li>
                        <li>
                            <a href="#!">
                                <i className="fa fa-phone-alt"></i>&nbsp;&nbsp;Call
                            </a>
                        </li>
                        <li>
                            <a href="#!">
                                <i className="fa fa-whatsapp"></i>&nbsp;&nbsp;Whatsapp
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3 mb-md-0 mb-3">
                    <h5 class="text-uppercase">Quick Links</h5>
                    <ul class="list-unstyled links">
                        <li>
                            <a href="#!">Home</a>
                        </li>
                        <li>
                            <a href="#!">Search</a>
                        </li>
                        <li>
                            <a href="#!">Account</a>
                        </li>
                        <li>
                            <a href="#!">About</a>
                        </li>
                        <li>
                            <a href="#!">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright text-center py-3">© 2022 Copyright:
            <a href="https://mdbootstrap.com/"> Victech Media</a><br/>
            <a href="#">Terms and Conditions</a>
        </div>
    </footer>
}

export default Footer;