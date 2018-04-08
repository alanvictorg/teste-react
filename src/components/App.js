import React, {Component} from 'react';
import '../styles/App.css';
import {
    Container, Row, Col
} from 'reactstrap';
import PersonsList from "./PersonsList";
import axios from "axios/index";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            search: '',
        };

    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0, 20)});
    }


    render() {

        return (
            <Container>
                <Row>
                    <Col sm={12} className="topo">
                        <input type="text" className="filter" value={this.state.search}
                               onChange={this.updateSearch.bind(this)}/>
                        <label className="filter-label">Filter by name: </label>
                    </Col>
                </Row>

                <PersonsList search={this.state.search}/>


            </Container>
        );
    }
}

export default App;
