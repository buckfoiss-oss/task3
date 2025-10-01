import React from "react";
import "./ErrorDisplay.css";
const ErrorDisplay = ({ message }) => {
    return (
        <div className="error-display">
            <p>Error: {message}</p>
        </div>
    );
}
export default ErrorDisplay;