import React, {Component} from 'react';
import {
    Row, Col, Container
} from 'reactstrap';
import axios from "axios/index";
import Person from "./Person";
import ReactPaginate from 'react-paginate';

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
                let next = res.data.info.next;
                let prev = res.data.info.prev;
                let pageCount = res.data.info.pageCount;
                this.setState({persons, next, prev, pageCount});
            })
    }

    handlePageClick = (data) => {
        let selected = data.selected + 1;

        axios.get(`https://rickandmortyapi.com/api/character/?page=` + selected)
            .then(res => {
                let persons = res.data.results;
                console.log(persons);
                let next = res.data.info.next;
                let prev = res.data.info.prev;
                this.setState({persons, next, prev});
            })

    };


    render() {

        let filteredItems = this.state.persons.filter(
            (person) => {
                return person.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
            }
        );

        return (
            <Container>
                <Row>
                    {filteredItems.map((person) =>
                        <Person person={person} key={person.id}/>
                    )}
                </Row><Row>
                <Col sm={12} className={"topo"}>
                    <ReactPaginate previousLabel={"previous"}
                                   nextLabel={"next"}
                                   breakClassName={"break-me"}
                                   pageCount={20}
                                   breakLabel={<a href="">...</a>}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination"}
                                   subContainerClassName={"pages pagination"}
                                   activeClassName={"active"}/>
                </Col>
            </Row>
            </Container>
        )


    }
}

export default PersonsList;