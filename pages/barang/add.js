import dynamic from "next/dynamic";
import { Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Box, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddBarang() {
    const router = useRouter();
    const [barangs, setBarangs] = useState({
        nama_barang: '',
        kode_barang: '',
        harga_barang: '',
    });   
    
    const handleSubmit = async () => {
        // console.log(JSON.stringify(barangs));
        
        try {
            const response = await fetch("https://dkrcilaku.com/api/v1/data-barang/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(barangs),
            });
            const result =await response.json();
            if (result?.status == true) {
                router.push('/barang');
            }
            
        } catch (error) {
            
        }
    }

    return (
        <LayoutComponent metaTitle={'Add Barang'}>
            <Card margin={5} padding={5}>
                <Heading>Add Barang</Heading>
                <Grid gap={5}>
                    <GridItem>
                        <Text>Nama</Text>
                        <Input type="text" onChange={(event) => setBarangs({ ...barangs, nama_barang: event.target.value })}></Input>
                    </GridItem>
                    <GridItem>
                        <Text>Kode</Text>
                        <Input type="text" onChange={(event) => setBarangs({ ...barangs, kode_barang: event.target.value })}></Input>
                    </GridItem>
                    <GridItem>
                        <Text>Harga</Text>
                        <Input type="number" onChange={(event) => setBarangs({ ...barangs, harga_barang: event.target.value })}></Input>
                    </GridItem>
                    <GridItem>
                        <Button colorScheme={'blue'} onClick={() => handleSubmit()}>Submit</Button>
                    </GridItem>
                </Grid>
            </Card>
        </LayoutComponent>
    )
}
