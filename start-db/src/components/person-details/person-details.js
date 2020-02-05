import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class PersonDetails extends Component {
    swapiService = new SwapiService();

    state = {
        person: null,
        loading: false
    };

    componentDidMount() {
        this.updatePerson();
    };

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId){
            this.updatePerson();
        }
    };

    async changeLoading(value) {
        const res = await this.setState({
            loading: value
        });
        return res;
    }

    updatePerson() {
        const {personId} = this.props;
        if (!personId){
            return;
        }
        this.changeLoading(true)
            .then(() => {
                this.swapiService
                    .getPerson(personId)
                    .then((person) => {
                        this.setState({
                            person,
                            loading: false
                        });
                    });
            });
    }

    getContent({id, name, gender, birthYear, eyeColor}) {
        return (
            <React.Fragment>
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }

    render() {
        let content = '';

        if (!this.state.person) {
            content = <span>Select person from List!</span>;
        } else if (this.state.loading) {
            content = <Spinner/>;
        } else {
            content = this.getContent(this.state.person);
        }

        return (
            <div className="person-details card">
                {content}
            </div>
        )
    }
}