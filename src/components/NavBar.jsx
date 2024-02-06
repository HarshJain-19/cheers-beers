import * as React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoupeIcon from "@mui/icons-material/Loupe";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function NavBar(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = React.useState("home");
    const [searchItem, setSearchItem] = React.useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === "details") return navigate("/details");
        else if (newValue === "favorites") return navigate("/favorites");
        else if (newValue === "searched") return navigate("/searched");
        else return navigate("/");
    };

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setValue("home");
                break;
            case "/details":
                setValue("details");
                break;
            case "/favorites":
                setValue("favorites");
                break;
            case "/searched":
                setValue("searched");
                break;
            default:
                setValue("home");
        }
        console.log(location.pathname);
    }, [location.pathname]);

    const searching = () => {
        searchItem.trim() !== "" ? props.changeSearched(searchItem.trim()) : "";
        navigate("/searched");
        setSearchItem("");
    };

    return (
        <Navbar
            expand="lg"
            className="bg-body-tertiary trans"
            style={{
                position: "sticky",
                top: "0",
                right: "0",
                left: "0",
                zIndex: "1",
            }}
        >
            <Container fluid className="px-4 py-2 fs-5 bg-primary fw-bold nav">
                <Navbar.Brand href="/" className="brand">
                    <img
                        src="/media/beer icon.png"
                        alt=""
                        height="25px"
                        className="px-2"
                    />
                    Cheers-Beers
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 mx-2 text-center trans"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <BottomNavigation
                            className="trans"
                            value={value}
                            onChange={handleChange}
                            sx={{ backgroundColor: "#0d6efd" }}
                        >
                            <BottomNavigationAction
                                label="Home"
                                value="home"
                                icon={<HomeIcon />}
                                sx={{
                                    backgroundColor: "#0d6efd",
                                    color: "#fff",
                                    "&.Mui-selected": { color: "greenyellow" },
                                }}
                            />
                            <BottomNavigationAction
                                label="Favorites"
                                value="favorites"
                                icon={<FavoriteIcon />}
                                sx={{
                                    backgroundColor: "#0d6efd",
                                    color: "#fff",
                                    "&.Mui-selected": { color: "greenyellow" },
                                }}
                            />
                            <BottomNavigationAction
                                label="Details"
                                value="details"
                                icon={<LoupeIcon />}
                                sx={{
                                    backgroundColor: "#0d6efd",
                                    color: "#fff",
                                    "&.Mui-selected": { color: "greenyellow" },
                                }}
                            />
                            <BottomNavigationAction
                                label="Searched"
                                value="searched"
                                icon={<PageviewIcon />}
                                sx={{
                                    backgroundColor: "#0d6efd",
                                    color: "#fff",
                                    "&.Mui-selected": { color: "greenyellow" },
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
                            value={searchItem}
                            onChange={(e) =>
                                setSearchItem(e.currentTarget.value)
                            }
                        />
                        <Button
                            variant="success"
                            className="me-2"
                            onClick={searching}
                        >
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
