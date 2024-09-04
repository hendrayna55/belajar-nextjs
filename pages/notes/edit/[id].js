import dynamic from "next/dynamic";
import { Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Box, Input, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNotes() {
    const router = useRouter();
    const { id } = router?.query;
    const [notes, setNotes] = useState();

    useEffect(() => {
        async function fetchingData() {
            const res = await fetch(
                `https://service.pace-unv.cloud/api/notes/${id}`
            );
            const listNotes = await res.json();
            setNotes(listNotes?.data);
        }
        fetchingData()
    }, [id]);

    const handleSubmit = async () => {        
        try {
            const response = await fetch(
                `https://service.pace-unv.cloud/api/notes/update/${id}`, 
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: notes?.title,
                        description: notes?.description,
                    }),
                }
            );
            const result =await response.json();
            
            if (result?.success) {
                router.push('/notes');
            }
            
        } catch (error) {
            
        }
    }

    return (
        <LayoutComponent metaTitle={'Edit Notes'}>
            <Card margin={5} padding={5}>
                <Heading>Edit Notes</Heading>
                <Grid gap={5}>
                    <GridItem>
                        <Text>Title</Text>
                        <Input type="text" value={notes?.title || ""} onChange={(event) => setNotes({ ...notes, title: event.target.value })}></Input>
                    </GridItem>
                    <GridItem>
                        <Text>Description</Text>
                        <Textarea value={notes?.description || ""} onChange={(event) => setNotes({ ...notes, description: event.target.value })}></Textarea>
                    </GridItem>
                    <GridItem>
                        <Button colorScheme={'blue'} onClick={() => handleSubmit()}>Submit</Button>
                    </GridItem>
                </Grid>
            </Card>
        </LayoutComponent>
    )
}
