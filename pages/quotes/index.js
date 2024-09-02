import dynamic from "next/dynamic";
import Link from "next/link";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ quotes }){    
    return(
        <>
            <LayoutComponent metaTitle={"Notes"}>
                <div className="grid grid-cols-4">
                    {
                        quotes.quotes.map((item) => (
                            <Link href={`/quotes/${item.id}`} key={item.id} className="m-2 p-2 border-2 border-blue-400">
                                <p className="text-blue-900 font-bold">{item.id}. {item.author}</p>
                            </Link>
                        ))
                    }
                </div>
            </LayoutComponent>
        </>
    );
}

export async function getStaticProps() {
    const res = await fetch('https://dummyjson.com/quotes');
    const quotes = await res.json();
    return { props: { quotes }, revalidate: 10 };
}