import dynamic from "next/dynamic";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Posts({posts}){
    console.log(posts);
    
    return (
        <LayoutComponent metaTitle={'Posts'}>
            {
                posts.map((item) => (
                    <div className="m-2 p-2 border-2 border-blue-500" key={item.id}>
                        <p>{item.id}</p>
                        <p>{item.title}</p>
                        <p>{item.body}</p>
                    </div>
                ))
            }
        </LayoutComponent>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    // Pass data to the page via props
    return { props: { posts } }
}