import React, {Component} from 'react';
import {
    Row
} from 'reactstrap';
import axios from "axios/index";
import Person from "./Person";

class PersonsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            persons: [],
        };

        axios.get(`https://rickandmortyapi.com/api/character/`)
            .then(res => {
                let persons = res.data.results;
                this.setState({persons});
            })
    }


    render() {

        let filteredItems = this.state.persons.filter(
            (person) => {
                return person.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
            }
        );

        return (
            <Row>
                {filteredItems.map((person) =>
                   <Person person={person} key={person.id}/>
                )}
            </Row>
        )


    }
}

export default PersonsList;