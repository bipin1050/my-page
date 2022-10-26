import React from 'react'
import facebook from '../imgs/icons/facebook.png'
import instagram from '../imgs/icons/instagram.png'
import twitter from '../imgs/icons/twitter.png'
import linkedin from '../imgs/icons/linkedin.png'

const Footer = () => {
  return (
    <div>
        <footer class="footer py-3">
            <div class="container">
                <p className='medium mb-0 text-light'>Social Links</p>
                <a href='https://facebook.com/bipin.khanal1050' target='_blank'><img src={facebook} width='30px' /> </a>
                <a href='https://www.instagram.com/_bip_in_/' target='_blank'><img src={instagram} width='30px' /> </a>
                <a href='https://twitter.com/bpin_khanal' target='_blank'><img src={twitter} width='30px' /> </a>
                <a href='https://www.linkedin.com/in/bipin-khanal-66a082244/' target='_blank'><img src={linkedin} width='30px' /> </a>
            </div>
            <br />
            <p className='container medium mb-0 text-light'>&copy; 2022, Bipin</p>
        </footer>
    </div>
  )
}

export default Footer