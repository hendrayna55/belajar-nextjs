import Link from "next/link";

export default function Menu(){
    return (
        <ul className="flex gap-5">
            <li><Link href={"/"}>Home</Link></li>
            <li><Link href={"/profile"}>Profile</Link></li>
            <li><Link href={"/users"}>Users</Link></li>
            <li><Link href={"/quotes"}>Quotes</Link></li>
        </ul>
    );
};