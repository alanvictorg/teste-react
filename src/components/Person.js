import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button,
    Row, Col, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from "axios/index";

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            search: ''
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


    render() {
        return (
            <Col xs="2">
                <Card>
                    <CardImg top width="100%"
                             src={this.props.person.image}
                             alt="Card image cap"/>
                    <CardBody>
                        <CardTitle>{this.props.person.name}</CardTitle>
                        <CardSubtitle>{this.props.person.id}</CardSubtitle>
                        <CardText>Status: {this.props.person.status} <br/>
                            Species: {this.props.person.species}
                        </CardText>
                        <Button color="danger" onClick={() => this.openModal(this.props.person)}>Detalhes</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}
                               className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>{this.state.name}</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col sm="12" md={{size: 8, offset: 2}}>
                                        <img width='100%' src={this.state.image} alt={this.state.name}/>
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
        )
    }
}

export default Person;