import dynamic from "next/dynamic";
import { Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
    const router = useRouter();
    const [notes, setNotes] = useState();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `https://service.pace-unv.cloud/api/notes/delete/${id}`,
                {
                    method: "DELETE",
                }
            );
            const result = await response.json();
            
            if (result?.success) {
                router.reload();
            }
            
        } catch (error) {
            
        }
    };

    useEffect(() => {
        async function fetchingData() {
            const res = await fetch("https://service.pace-unv.cloud/api/notes");
            const listNotes = await res.json();
            setNotes(listNotes);
        }
        fetchingData()
    }, []);

    return (
        <LayoutComponent metaTitle={'Employee'}>
            <Box padding={5}>
                <Flex justifyContent={'end'}>
                    <Button colorScheme={'blue'} onClick={() => router.push('notes/add')}>Add Notes</Button>
                </Flex>
                <Flex>
                    <Grid templateColumns={'repeat(3, 1fr)'} gap={5}>
                        {
                            notes?.data?.map((item) => (
                                <GridItem key={item.id}>
                                    <Card>
                                        <CardHeader>
                                            <Heading>{item.title}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{item.description}</Text>
                                        </CardBody>
                                        <CardFooter
                                            justify={"space-between"}
                                            flexWrap={'wrap'}>
                                            <Button flex={1} variant={'ghost'} onClick={() => router.push(`/notes/edit/${item?.id}`)}>
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDelete(item.id)} flex={1} colorScheme={'red'}>
                                                Delete
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            ))
                        }
                    </Grid>
                </Flex>
            </Box>
        </LayoutComponent>
    )
}