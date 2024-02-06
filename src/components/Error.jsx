import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div
            style={{
                color: "red",
                textAlign: "center",
                marginTop: "2rem",
                fontSize: "2rem",
            }}
        >
            InValid Page.... <br />
            <Link to="/">
                <Button variant="outline-primary">Click here to go Home</Button>
            </Link>
        </div>
    );
};

export default Error;
