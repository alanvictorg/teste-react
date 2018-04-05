import React, {Component} from 'react';
import '../styles/App.css';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody, Media, CardTitle, CardSubtitle, Button,
    Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';


class App extends Component {
    episodesNames = [];

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            persons: []
        };

        this.toggle = this.toggle.bind(this);
    }

    openModal(person) {

        this.formatEpisodes(person.episode);

        this.setState({
            modal: !this.state.modal,
            id: person.id,
            name: person.name,
            status: person.status,
            species: person.species,
            image: person.image,
            episodes: this.episodesNames
        });
    }

    formatEpisodes(episodes) {
        this.episodesNames = [];
        for (var i = 0; i < episodes.length; i++) {
            axios.get(episodes[i])
                .then(res => {
                    this.episodesNames.push(res.data.name + ', ')
                })
        }

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        axios.get(`https://rickandmortyapi.com/api/character/`)
            .then(res => {
                const persons = res.data.results;
                this.setState({persons});
            })
    }

    render() {
        return (
            <Container>
                <Row>
                    {this.state.persons.map((person, index) =>
                        <Col xs="3">
                            <Card>
                                <CardImg top width="100%"
                                         src={person.image}
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>{person.name}</CardTitle>
                                    <CardSubtitle>{person.id}</CardSubtitle>
                                    <CardText>Status: {person.status} <br/>
                                        Species: {person.species}
                                    </CardText>
                                    <Button color="danger" onClick={() => this.openModal(person)}>Detalhes</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle}
                                           className={this.props.className}>
                                        <ModalHeader toggle={this.toggle}>{this.state.name}</ModalHeader>
                                        <ModalBody>
                                            <Row>
                                                <Col sm="12" md={{size: 8, offset: 2}}>
                                                    <img width='100%' src={this.state.image}/>
                                                </Col>
                                            </Row>
                                            <b>Id: </b>{this.state.id}<br/>
                                            <b>Status: </b>{this.state.status}<br/>
                                            <b>Species: </b>{this.state.species}<br/>
                                            <b>Episodes: </b>{this.state.episodes}<br/>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.toggle}>Close</Button>{' '}
                                        </ModalFooter>
                                    </Modal> </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
                <div id="pagi"></div>
            </Container>
        );
    }
}

export default App;
