import React, {Component} from 'react';
import { withRouter } from "react-router";
import { Table, Button } from "react-bootstrap";

class OrdersList extends Component {

    handleEditOrder = (id) => {
        this.props.history.push(`/edit-order/${id}`)
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <td>
                        №
                    </td>
                    <td>
                        Дата
                    </td>
                    <td>
                        Пользователь
                    </td>
                    <td>
                        Продукт
                    </td>
                    <td>
                        Добавить
                    </td>
                    <td>
                        Удалить
                    </td>
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.orders && this.props.orders.map( (item, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item.date}</td>
                                <td>{item.userName}</td>
                                <td>{item.productName}</td>
                                <td align="center">
                                    <Button variant="primary"
                                            onClick={ () => this.handleEditOrder(index) }>
                                        Редактировать
                                    </Button>
                                </td>
                                <td align="center">
                                    <Button variant="danger"
                                            onClick={ () => this.props.handleDeleteItem(item.id) }>
                                        Удалить
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}

export default withRouter(OrdersList);