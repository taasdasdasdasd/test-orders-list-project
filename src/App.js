import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Views/Components/Main'
import AddNewOrder from './Views/Components/AddNewOrder'
import EditOrder from "./Views/Components/EditOrder/EditOrder";
import moment from "moment";
import './GlobalStyles/index.scss'

const MOCK_DATA = [
    {
        id: 0,
        productName: 'Ztest 1',
        userName: 'user1',
        date: '01.02.2019'
    },
    {
        id: 1,
        productName: 'Ftest 2',
        userName: 'user2',
        date: '01.02.2019'
    },
    {
        id: 2,
        productName: 'Etest 3',
        userName: 'user3',
        date: '03.02.2019'
    },
    {
        id: 3,
        productName: 'Dtest 2',
        userName: 'user2',
        date: '01.02.2019'
    },
    {
        id: 4,
        productName: 'Ctest 3',
        userName: 'user3',
        date: '03.02.2019'
    },
    {
        id: 5,
        productName: 'Btest 2',
        userName: 'user2',
        date: '01.01.2020'
    },
    {
        id: 6,
        productName: 'Atest 3',
        userName: 'user3',
        date: '12.01.2020'
    }
]

class App extends Component{

    maxId = 50;

    state = {
        orders: [...MOCK_DATA],
        dataForShow: [],
    }

    componentDidMount() {
        this.updateDataForShow()
    }

    updateDataForShow = () => {
        this.setState({
            dataForShow: [...this.state.orders]
        })
    }

    handleDeleteItem = (itemId) => {
        //Удаляем заказ
        this.setState({
            orders: [ ...this.state.orders.filter( item => item.id !== itemId )]
        }, () => {
            //Обновляем данные для отображения
            this.updateDataForShow()
        })
    }

    handleAddNewOrder = (newOrder) => {
        this.setState({
            orders: [ ...this.state.orders, { ...newOrder, id: ++this.maxId }]
        }, () => {
            this.updateDataForShow()
        })
    }

    handleEditOrder = ( editedOrderList ) => {
        this.setState({
            orders: [...editedOrderList]
        }, () => {
            this.updateDataForShow()
        })
    }

    diffDays = (orderDate) => {
        const date =  new Date();
        const currentDate = date.getDate() + '.' + (Number(date.getMonth()) + 1) + '.' + date.getFullYear();
        const a = moment(`${orderDate}`, 'DD.MM.YYYY');
        const b = moment(`${currentDate}`,'DD.MM.YYYY');
        const diffInDays = b.diff( a, 'days');

        return diffInDays;
    }

    filterOrders = (filterBy) => {

        switch (filterBy) {
            case 'all':
                this.setState({
                    dataForShow: [...this.state.orders]
                });
                break;
            case 'today':
                this.setState({
                    dataForShow: [...this.state.orders.filter( item =>
                        this.diffDays(item.date) === 0
                    )]
                });
                break;
            case 'month':
                this.setState({
                    dataForShow: [...this.state.orders.filter( item =>
                        this.diffDays(item.date) <= 30
                    )]
                });
                break;
            case 'week':
                this.setState({
                    dataForShow: [...this.state.orders.filter( item =>
                        this.diffDays(item.date) <= 7
                    )]
                });
                break;
            case 'user':
                this.setState({
                    dataForShow: [...this.state.orders.sort( (item1, item2) =>
                        item1.userName > item2.userName ?  1 :
                        item1.userName < item2.userName ? -1 : 0
                    )]
                });
                break;
            case 'product':
                this.setState({
                    dataForShow: [...this.state.orders.sort( (item1, item2) =>
                        item1.productName > item2.productName ?  1 :
                        item1.productName < item2.productName ? -1 : 0
                    )]
                });
                break;
            default:
                this.setState({
                    dataForShow: [...this.state.orders]
                });
                break;
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'
                           render = { props => <Main
                                                  {...props}
                                                  orders={this.state.dataForShow}
                                                  handleDeleteItem={this.handleDeleteItem}
                                                  filterOrders={this.filterOrders}/>}/>
                    <Route exact path='/add-new-order'
                           render = { props => <AddNewOrder
                                                  {...props}
                                                  handleAddNewOrder={this.handleAddNewOrder}/>}/>
                    <Route exact path='/edit-order/:id'
                           render = { props => <EditOrder
                                                  {...props}
                                                  orders={this.state.orders}
                                                  handleEditOrder={this.handleEditOrder}/>}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
