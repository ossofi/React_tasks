import React from 'react';
import './Footer.scss';
import logo from '../../assets/images/logo.png';
import inst from '../../assets/images/Inst.png';
import tw from '../../assets/images/Twitt.png';
import ytb from '../../assets/images/Youtube.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container-footer'>
        <div className='footer-over-line'>
          <div className='footer-brand'>
            <a className='footer-logo' href='#'>
              <img src={logo} alt="Logo" />
            </a>
            <p className='brand-slogan'>
              Takeaway & Delivery template for small - medium businesses.
            </p>
          </div>

          <div className='footer-info'>
            <div className='col-1'>
              <h1 className='col-h'>COMPANY</h1>
              <p><a href='#' className='text'>Home</a></p>
              <p><a href='#' className='text'>Order</a></p>
              <p><a href='#' className='text'>FAQ</a></p>
              <p><a href='#' className='text'>Contact</a></p>
            </div>

            <div className='col-2'>
              <h1 className='col-h'>TEMPLATE</h1>
              <p><a href='https://www.google.com/' className='text'>Style Guide</a></p>
              <p><a href='https://www.google.com/' className='text'>Changelog</a></p>
              <p><a href='https://www.google.com/' className='text'>Licence</a></p>
              <p><a href='https://www.google.com/' className='text'>Webflow University</a></p>
            </div>

            <div className='col-3'>
              <h1 className='col-h'>FLOWBASE</h1>
              <p><a href='#' className='text'>More Cloneables</a></p>
            </div>
          </div>
        </div>

        <hr className='line' />

        <div className='footer-under-line'>
          <div className='col-1 footer'>
            Built by <span className='highlight'>Flowbase</span> · Powered by <span className='highlight'>Webflow</span>
          </div>
          <div className='col-2 socials-wrapper'>
            <div className='socials'>
              <img src={inst} alt="Instagram" className='socials-icon' />
              <img src={tw} alt="Twitter" className='socials-icon' />
              <img src={ytb} alt="YouTube" className='socials-icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
