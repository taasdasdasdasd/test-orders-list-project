import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class EditOrder extends Component {

    backToHome = () => {
        this.props.history.push('/');
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    editOder = (e) => {
        e.preventDefault();

        const index = Number(this.props.match.params.id);
        const order = this.props.orders[index];
        const arr = this.props.orders;

        const editedItem = { ...order, ...this.state }

        const editedOrdersList = [
            ...arr.slice(0, index),
            editedItem,
            ...arr.slice(index + 1),
        ]

        this.props.handleEditOrder( editedOrdersList )
        this.props.history.push('/');
    }

    render() {
        const index = this.props.match.params.id;
        const order = this.props.orders[index];

        return (
            <Container>
                <Row>
                    <Col>
                        <Button variant="info"
                                onClick={this.backToHome}
                                className="back-to-home__btn">
                            На главную
                        </Button>
                        <h2>
                            Редактировать данные заказа
                        </h2>
                        <Form>
                            <Form.Group controlId="formBasicPassword2">
                                <Form.Label>Имя пользователя:</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Введите имя пользователя"
                                              name="userName"
                                              defaultValue={order.userName}
                                              onChange={this.handleInputChange}
                                              required/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Название продукта:</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Ввеедите название пользователя"
                                              name="productName"
                                              defaultValue={order.productName}
                                              onChange={this.handleInputChange}
                                              required/>
                            </Form.Group>
                            <Button variant="primary"
                                    type="submit"
                                    onClick={this.editOder}>
                                Сохранить
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(EditOrder);