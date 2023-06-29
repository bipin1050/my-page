import React from 'react'
import facebook from '../imgs/icons/facebook.png'
import instagram from '../imgs/icons/instagram.png'
import twitter from '../imgs/icons/twitter.png'
import linkedin from '../imgs/icons/linkedin.png'

const Footer = () => {
  return (
    <div>
        <footer className="footer py-3">
            <div className="container">
                <p className='medium mb-0 text-light'>Social Links</p>
                <a href='https://facebook.com/bipin.khanal1050' target='_blank' rel="noreferrer"><img src={facebook} width='30px' alt='facebook'/> </a>
                <a href='https://www.instagram.com/_bip_in_/' target='_blank' rel="noreferrer"><img src={instagram} width='30px'alt='instagram' /> </a>
                <a href='https://twitter.com/bpin_khanal' target='_blank' rel="noreferrer"><img src={twitter} width='30px' alt='twitter'/> </a>
                <a href='https://www.linkedin.com/in/bipin-khanal-66a082244/' target='_blank' rel="noreferrer"><img src={linkedin} width='30px' alt='linkedin'/> </a>
            </div>
            <br />
            <p className='container medium mb-0 text-light'>&copy; 2022, Bipin</p>
        </footer>
    </div>
  )
}

export default Footer