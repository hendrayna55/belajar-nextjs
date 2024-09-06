import dynamic from "next/dynamic";
import { Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Box, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));
import { useQueries } from "@/hooks/useQueries";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export default function Notes() {
    // const { data, isLoading } = useQueries({ 
    //     prefixUrl: `https://service.pace-unv.cloud/api/notes`,
    // });

    const { data, error, isLoading } = useSWR(
        `https://service.pace-unv.cloud/api/notes`, 
        fetcher,
        {
            revalidateOnFocus: true,
        }
    );
    
    const router = useRouter();

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

    return (
        <LayoutComponent metaTitle={'Employee'}>
            <Box padding={5}>
                <Flex justifyContent={'end'}>
                    <Button colorScheme={'blue'} onClick={() => router.push('notes/add')}>Add Notes</Button>
                </Flex>
                {
                    isLoading ? (
                        <Flex alignItems={'center'} justifyContent={'center'}>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        </Flex>
                    ) : (
                        <Flex>
                            <Grid templateColumns={'repeat(3, 1fr)'} gap={5}>
                                {
                                    data?.data?.map((item) => (
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
                    )
                }
            </Box>
        </LayoutComponent>
    )
}