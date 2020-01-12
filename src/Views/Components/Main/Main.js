import React, { Component } from 'react'
import { withRouter } from "react-router"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import OrdersList from "../OrdersList/OrdersList"
import './index.scss'

class Main extends Component {

    state = {
        orders: [...this.props.orders]
    }

    handleSetFilterBy = (e) => {
        //Выбираем критерий фильтрации
        this.props.filterOrders(e.target.id)
    }

    addNewOrder = () => {
        this.props.history.push('/add-new-order')
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <fieldset className="filters">
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>
                                    Фильтровать по:
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="Просмотреть список всех заказов"
                                        name="selectFilter"
                                        id="all"
                                        onClick={this.handleSetFilterBy}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Сегодня"
                                        name="selectFilter"
                                        id="today"
                                        onChange={this.handleSetFilterBy}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Последний месяц"
                                        name="selectFilter"
                                        id="month"
                                        onChange={this.handleSetFilterBy}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Последняя неделя"
                                        name="selectFilter"
                                        id="week"
                                        onChange={this.handleSetFilterBy}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="По пользователю"
                                        name="selectFilter"
                                        id="user"
                                        onChange={this.handleSetFilterBy}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="По продукту"
                                        name="selectFilter"
                                        id="product"
                                        onChange={this.handleSetFilterBy}
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                    </Col>
                    <Col xs="12">
                        <Button onClick={this.addNewOrder} className="add_order">
                            Добавить заказ
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <OrdersList orders={ this.props.orders }
                                    handleDeleteItem={this.props.handleDeleteItem}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Main);