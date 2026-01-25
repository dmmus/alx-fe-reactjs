import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
        <Link to="/about" style={{ marginRight: '20px' }}>About</Link>
        <Link to="/services" style={{ marginRight: '20px' }}>Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    );
  }

export default Navbar;