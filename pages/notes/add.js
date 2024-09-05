import dynamic from "next/dynamic";
import { Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Box, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));
import { useMutation } from "@/hooks/useMutation";

export default function AddNotes() {
    const { mutate } = useMutation();
    const router = useRouter();
    const [notes, setNotes] = useState({
        title: '',
        description: '',
    });   
    
    const handleSubmit = async () => {
        const response = await mutate(
            { 
                url: `https://service.pace-unv.cloud/api/notes`,
                payload: notes,
            },
        );

        console.log("response => ", response);

        if (response?.success) {
            router.push('/notes');
        }
    }

    return (
        <LayoutComponent metaTitle={'Add Notes'}>
            <Card margin={5} padding={5}>
                <Heading>Add Notes</Heading>
                <Grid gap={5}>
                    <GridItem>
                        <Text>Title</Text>
                        <Input type="text" onChange={(event) => setNotes({ ...notes, title: event.target.value })}></Input>
                    </GridItem>
                    <GridItem>
                        <Text>Description</Text>
                        <Textarea onChange={(event) => setNotes({ ...notes, description: event.target.value })}></Textarea>
                    </GridItem>
                    <GridItem>
                        <Button colorScheme={'blue'} onClick={() => handleSubmit()}>Submit</Button>
                    </GridItem>
                </Grid>
            </Card>
        </LayoutComponent>
    )
}
