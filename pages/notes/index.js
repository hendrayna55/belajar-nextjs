import dynamic from "next/dynamic";
import { Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Box, Spinner, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Input, Textarea, GridItem as ChakraGridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import Link from "next/link";

export default function Notes() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState(null); // Menyimpan ID note yang akan diedit
    const [notes, setNotes] = useState({
        title: '',
        description: '',
    });

    // Fetch notes data
    const { data, error, isLoading } = useSWR(
        `https://service.pace-unv.cloud/api/notes`, 
        fetcher,
        {
            revalidateOnFocus: true,
        }
    );

    // Fetch selected note for editing
    useEffect(() => {
        if (isEditMode && selectedNoteId) {
            async function fetchingData() {
                const res = await fetch(
                    `https://service.pace-unv.cloud/api/notes/${selectedNoteId}`
                );
                const listNotes = await res.json();
                setNotes(listNotes?.data || {});
            }
            fetchingData();
        }
    }, [selectedNoteId, isEditMode]);

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
            console.error("Failed to delete note:", error);
        }
    };

    const handleSubmit = async () => {
        const url = isEditMode
            ? `https://service.pace-unv.cloud/api/notes/update/${selectedNoteId}`
            : `https://service.pace-unv.cloud/api/notes`;

        const method = isEditMode ? "PATCH" : "POST";

        try {
            const response = await fetch(
                url,
                {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(notes),
                }
            );
            const result = await response.json();
            
            if (result?.success) {
                router.reload();
            }
            
        } catch (error) {
            console.error("Failed to submit note:", error);
        }
        closeModal(); // Close modal after submission
    };

    const openModal = (id = null) => {
        if (id) {
            setSelectedNoteId(id);
            setIsEditMode(true); // Edit mode
        } else {
            setNotes({ title: '', description: '' }); // Reset form for adding
            setIsEditMode(false); // Add mode
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNoteId(null);
    };

    return (
        <LayoutComponent metaTitle={'Notes'}>
            <Box padding={5}>
                <Flex justifyContent={'end'}>
                    <Button colorScheme={'blue'} onClick={() => openModal()}>Add Notes</Button>
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
                                                    <Heading><Link href={`/notes/${item.id}`}>{item.title}</Link></Heading>
                                                </CardHeader>
                                                <CardBody>
                                                    <Text>{item.description}</Text>
                                                </CardBody>
                                                <CardFooter
                                                    justify={"space-between"}
                                                    flexWrap={'wrap'}>
                                                    <Button flex={1} variant={'ghost'} onClick={() => openModal(item?.id)}>
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

                {/* Modal for Add/Edit Notes */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{isEditMode ? 'Edit Note' : 'Add Note'}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid gap={5}>
                                <ChakraGridItem>
                                    <Text>Title</Text>
                                    <Input 
                                        type="text" 
                                        value={notes?.title || ""} 
                                        onChange={(event) => setNotes({ ...notes, title: event.target.value })}
                                    />
                                </ChakraGridItem>
                                <ChakraGridItem>
                                    <Text>Description</Text>
                                    <Textarea 
                                        value={notes?.description || ""} 
                                        onChange={(event) => setNotes({ ...notes, description: event.target.value })}
                                    />
                                </ChakraGridItem>
                            </Grid>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button colorScheme="green" onClick={handleSubmit}>
                                {isEditMode ? 'Update' : 'Submit'}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Box>
        </LayoutComponent>
    )
}
