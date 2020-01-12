import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class AddOrder extends Component {

    backToHome = () => {
        this.props.history.push('/');
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addNewOder = (e) => {
        this.props.handleAddNewOrder( { ...this.state } )
        this.props.history.push('/');
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Button variant="info"
                                onClick={this.backToHome}
                                className="back-to-home__btn">
                            На главную
                        </Button>
                        <h1>
                            Добавление нового заказа
                        </h1>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Дата:</Form.Label>
                                <Form.Control type="date"
                                              placeholder="Введите дату"
                                              name="date"
                                              onChange={this.handleInputChange}
                                              required/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Имя пользователя:</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Введите имя пользователя"
                                              name="userName"
                                              onChange={this.handleInputChange}
                                              required/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Название продукта:</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Ввеедите название пользователя"
                                              name="productName"
                                              onChange={this.handleInputChange}
                                              required/>
                            </Form.Group>
                            <Button variant="primary"
                                    type="submit"
                                    onClick={this.addNewOder}>
                                Добавить
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(AddOrder);