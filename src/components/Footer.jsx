import PropTypes from 'prop-types';

function Footer({ year }) {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="acknowledgement">
                    <h4>ACKNOWLEDGEMENT OF COUNTRY</h4>
                <p>We acknowledge and pay respect to all First Nations people of this country now called Australia. We acknowledge Country and all Traditional Custodians and Elders, past and present of these nations and for the continuation of cultural, spiritual and educational practices of Aboriginal and Torres Strait Islander peoples. We acknowledge this sacred land was taken by force without consent and to this day sovereignty was never ceded. Aboriginal and Torres Strait Islander peoples should be aware that this website may contain images or names of people who have passed away.</p>
                </div>
                <div className="copyright">
                    <p>Copyright © {year} Anaya Dodge</p>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    year: PropTypes.number.isRequired
};

export default Footer; 