import { useLoaderData, Link, NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function Careers() {
    const careers = useLoaderData();

    return (
        <div className="careers">
            {careers.map(career => (
                <Link to={career.id.toString()} key={career.id}>
                    <p>{career.title} <strong>BASED IN</strong> {career.location}</p>
                </Link>
            ))}
        </div>
    )
}

export const careersLoader = async () => {
    const res = await fetch("http://localhost:4000/careers");

    if(!res.ok) {
        throw Error("Could not find that career");
    }
    
    return res.json();
}