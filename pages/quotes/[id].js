import dynamic from "next/dynamic";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function DetailQuotes({quotes}){
    return (
        <LayoutComponent metaTitle={'Detail Quotes'}>
            <div>
                <p>ID: <b>{quotes.id}</b></p>
                <p>Author: <b>{quotes.author}</b></p>
                <p>Quote: <b>{quotes.quote}</b></p>
            </div>
        </LayoutComponent>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://dummyjson.com/quotes');
    const quotes = await res.json();

    const paths = quotes.quotes.map((item) => ({
        params: {
            id: item.id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}
   
export async function getStaticProps(context) {
    const { id } = context.params;
    const res = await fetch(`https://dummyjson.com/quotes/${id}`);
    const quotes = await res.json();
    
    return { props: { quotes }, revalidate: 10 };
}