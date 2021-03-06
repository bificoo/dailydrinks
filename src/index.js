import React from "react";
import ReactDOM from "react-dom";
import Header from "modules/Header";
import Summary from "modules/Summary";
import OrderList from "modules/OrderList";
import { ADD, EDIT } from "modules/OrderList/constant";
import "normalize.css";
import "./style.sass";

class App extends React.Component {

    state = {
        list: [],
    }

    add(target) {
        this.setState({
            list: [
                ...this.state.list,
                {
                    ...target,
                    id: this.state.list.length,
                    edit: false,
                },
            ]
        });
    }

    edit(target) {
        this.setState({
            list: [
                ...this.state.list.map(item => target.id === item.id ? 
                    { ...target, edit: false} : 
                    { ...item, edit: false }
                ),
            ]
        });
    }

    handleComplete = (target, status) => {
        status === ADD && this.add(target);
        status === EDIT && this.edit(target);
    }

    handleDelete = target => {
        this.setState({
            list: [
                ...this.state.list.filter(item => target.id !== item.id),
            ]
        });
    }

    handleSwitchEditing = (target, focusItem) => {
        this.setState({
            list: [
                ...this.state.list.map(item => target.id === item.id ? 
                    { ...target, edit: focusItem} : 
                    { ...item, edit: false }
                ),
            ]
        });
    }

    handleSwitchEdited = () => {
        this.setState({
            list: [
                ...this.state.list.map(item => ({ ...item, edit: false }))
            ]
        });
    }

    render() {        
        return (
            <article onClick={e => !e.target.getAttribute("class") && this.handleSwitchEdited()}>
                <Header />
                <Summary list={this.state.list} />
                <OrderList>
                    {
                        this.state.list.map((item, inx) => (
                            item.edit ? 
                                <OrderList.EditItem
                                    key={`item-${inx}`}
                                    info={item}
                                    onComplete={this.handleComplete}
                                /> :
                                <OrderList.ViewItem
                                    key={`item-${inx}`}
                                    info={item}
                                    onSwitchEditing={this.handleSwitchEditing}
                                    onDelete={this.handleDelete}
                                />
                        ))
                    }
                    {
                        <OrderList.EditItem
                            key={`add-${this.state.list.length}`} 
                            disabled={this.state.list.filter(item => !!item.edit).length > 0}
                            onFocus={this.handleSwitchEdited}
                            onComplete={this.handleComplete} 
                        />
                    }
                </OrderList>
            </article>
        )
    }
};

ReactDOM.render(
    <App />,
    document.getElementById("wrapper")
);