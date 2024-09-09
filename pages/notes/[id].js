import { Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function DetailNotes({notes}){
    const router = useRouter();
    
    return (
        <LayoutComponent metaTitle={'Detail Notes'}>
            <div>
                <p>ID: <b>{notes.data.id}</b></p>
                <p>Title: <b>{notes.data.title}</b></p>
                <p>Description: <b>{notes.data.description}</b></p>
            </div>
            <div>
                <Button onClick={() => router.push('/notes')}>Kembali</Button>
            </div>
        </LayoutComponent>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://service.pace-unv.cloud/api/notes');
    const notes = await res.json();

    const paths = notes.data.map((item) => ({
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
    const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
    const notes = await res.json();
    
    return { props: { notes }, revalidate: 10 };
}