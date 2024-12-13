import PropTypes from 'prop-types';

function Footer({ year }) {
    return (
        <footer className="footer">
            <p>Copyright © {year} Anaya Dodge</p>
        </footer>
    );
}

Footer.propTypes = {
    year: PropTypes.number.isRequired
};

export default Footer; 