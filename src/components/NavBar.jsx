import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoupeIcon from '@mui/icons-material/Loupe';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue=='home') 
      return navigate('/');
    else if (newValue=='details') 
      return navigate('/details');
    else 
      return navigate('/favourites');
  };

  // useEffect(() => {
  //   setValue(location.pathname);
  //   console.log(location.pathname);
  // }, [location.pathname]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className='px-4 py-2 bg-info fs-5 fw-bold'>
        <Navbar.Brand href='/' className='brand'><img src="../../public/media/beer icon.png" alt="icon" height='25px' className='px-2'/>Cheers-Beers</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0 mx-2 text-center trans"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
              <BottomNavigation className='trans' value={value} onChange={handleChange} sx={{backgroundColor: '#0dcaf0',}}>
                <BottomNavigationAction
                  label="Home"
                  value="home"
                  icon={<HomeIcon />}
                  sx={{
                    backgroundColor: '#0dcaf0',
                    color: '#fff',
                    '&.Mui-selected': {color: 'green',},
                  }}
                />
                <BottomNavigationAction
                  label="Favorites"
                  value="favorites"
                  icon={<FavoriteIcon />}
                  sx={{
                    backgroundColor: '#0dcaf0',
                    color: '#fff',
                    '&.Mui-selected': {color: 'green',},
                  }}
                />
                <BottomNavigationAction
                  label="Details"
                  value="details"
                  icon={<LoupeIcon />}
                  sx={{
                    backgroundColor: '#0dcaf0',
                    color: '#fff',
                    '&.Mui-selected': {color: 'green',},
                  }}
                />
              </BottomNavigation> 
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search by beer name"
              className="me-4 search"
              aria-label="Search"
            />
            <Button variant="success" className='me-2'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;