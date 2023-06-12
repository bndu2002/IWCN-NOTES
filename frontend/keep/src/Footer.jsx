import React  from "react";
import './index.css'

export default function Footer(){
    let year = new Date().getFullYear()
    return (
        <>
        <footer>
           copyright © {year}
        </footer>
        </>
    )
}