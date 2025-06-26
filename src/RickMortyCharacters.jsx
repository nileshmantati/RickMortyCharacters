import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Modal,
    Button,
} from "react-bootstrap";

const RickMortyCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
            .get("https://rickandmortyapi.com/api/character")
            .then((res) => {
                setCharacters(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching characters:", err);
                setLoading(false);
            });
    }, []);

    const handleImageClick = (id) => {
        setShowModal(true);
        setSelectedCharacter(null);

        axios
            .get(`https://rickandmortyapi.com/api/character/${id}`)
            .then((res) => {
                setSelectedCharacter(res.data);
            })
            .catch((err) => {
                console.error("Error loading character details:", err);
            });
    };
    return (
        <div>
            <Container>
                <h1 className="text-center my-5 display-5 fw-medium">Rick and Morty Characters</h1>

                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p>Loading...</p>
                    </div>
                ) : (
                    <Row>
                        {characters.map((char) => (
                            <Col xs={12} sm={6} md={4} lg={2} key={char.id} className="mb-4">
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={char.image}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleImageClick(char.id)}
                                    />
                                    <Card.Body>
                                        <Card.Title className="text-center fw-bold" onClick={() => handleImageClick(char.id)} style={{ cursor: "pointer" }}>{char.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                <Row>
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {selectedCharacter ? selectedCharacter.name : "Loading..."}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedCharacter ? (
                                <div className="text-center">
                                    <img
                                        src={selectedCharacter.image}
                                        alt={selectedCharacter.name}
                                        className="img-fluid rounded mb-3"
                                    />
                                    <p><strong>Status:</strong> {selectedCharacter.status}</p>
                                    <p><strong>Species:</strong> {selectedCharacter.species}</p>
                                    <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
                                    <p><strong>Origin:</strong> {selectedCharacter.origin.name}</p>
                                    <p><strong>Location:</strong> {selectedCharacter.location.name}</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Spinner animation="border" />
                                    <p>Loading character info...</p>
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Container>
        </div>
    )
}

export default RickMortyCharacters
