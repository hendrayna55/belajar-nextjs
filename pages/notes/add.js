import dynamic from "next/dynamic";
import { Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Box, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNotes() {
    const router = useRouter();
    const [notes, setNotes] = useState({
        title: '',
        description: '',
    });   
    
    const handleSubmit = async () => {        
        try {
            const response = await fetch("https://service.pace-unv.cloud/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notes),
            });
            const result =await response.json();
            console.log(result);
            
            if (result?.success) {
                router.push('/notes');
            }
            
        } catch (error) {
            
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
