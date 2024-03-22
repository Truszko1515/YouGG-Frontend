import { useParams, useLoaderData } from "react-router-dom";


export default function CareerDetail() {
    const { id } = useParams();
    const career = useLoaderData();

    return (
        <div className="career-details">
            <h2>Career Details for {career.title}</h2>
            <p>Starting salary: {career.salary}</p>
            <p>Location: {career.location}</p>
        </div>
    )
}

export const CareerDetailsLoader = async ({params}) => {
    const { id } = params

    const res = await fetch("http://localhost:4000/careers/" + id);

    if(!res.ok) {
        throw Error("Could not find that career");
    }

    return res.json();
}