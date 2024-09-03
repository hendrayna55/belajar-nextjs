import dynamic from "next/dynamic";
import { Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Barang() {
    const router = useRouter();
    const [barangs, setBarangs] = useState();

    useEffect(() => {
        async function fetchingData() {
            const res = await fetch("https://dkrcilaku.com/api/v1/data-barang");
            const listEmployees = await res.json();
            setBarangs(listEmployees);
        }
        fetchingData()
    }, []);

    console.log('Data Barang => ', barangs);
    

    return (
        <LayoutComponent metaTitle={'Employee'}>
            <Box padding={5}>
                <Flex justifyContent={'end'}>
                    <Button colorScheme={'blue'} onClick={() => router.push('barang/add')}>Add Barang</Button>
                </Flex>
                <Flex>
                    <Grid templateColumns={'repeat(3, 1fr)'} gap={5}>
                        {
                            barangs?.data?.map((item) => (
                                <GridItem key={item.id}>
                                    <Card>
                                        <CardHeader>
                                            <Heading>{item.kode}</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{item.nama}</Text>
                                            <Text>{item.harga}</Text>
                                        </CardBody>
                                        <CardFooter
                                            justify={"space-between"}
                                            flexWrap={'wrap'}>
                                            <Button flex={1} variant={'ghost'} >
                                                Edit
                                            </Button>
                                            <Button flex={1} colorScheme={'red'} >
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
