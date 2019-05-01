import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    };

    //! TypeError: Cannot convert undefined or null to object
    /* burger
        src/components/Burger/Burger.js:21
        18 |     return [...Array(props.ingredients[igKey])]
        19 |  * }: [Array(1), Array(1), Array(2), Array(1)]
        20 |  
        > 21 | let transformedIngredients = Object.keys(props.ingredients)
            | ^  22 |     .map((igKey) => {
        23 |         // console.log('igKey: ', igKey);
        24 |         // console.log('Array(props.ingredients[igKey]): ', Array(props.ingredients[igKey])); */
    // componentDidMount() { // REM: because componentDidMount lifecycle gets executed after all child components been rendered and mount, therefore using componentWillMount lifecycle to ensure 'this.state.ingredients' object been generated with data, thus preventing TypeError (above) of child processing on a null/undefined object
    componentWillMount() {
        // console.log('[Checkout] componentWillMount');
        // console.log(this.props.location.search);
        let ingredients = {};
        let price = 0;
        const queryString = new URLSearchParams(this.props.location.search);

        for (let param of queryString.entries()) {
            // console.log(param); // ["bacon", "1"]
            if (param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        // console.log(ingredients);
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack(); // back to previous page
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data'); // relative path to next page
    };

    render(props) {
        console.log('[Checkout] ', this.props);
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler} // back
                    checkoutContinued={this.checkoutContinuedHandler} // next page
                />
                {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}
                {/* render manually to pass props to component */}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    /**
                    REM: render manually prevents having routing props (history, location, match) avail to ContactData component
                    FIX:
                    1) passing the props as argument to render()
                        render={(props) => (
                            <ContactData
                                ingredients={this.state.ingredients}
                                totalPrice={this.state.totalPrice}
                                {...props}
                            />
                        )}
                    2) OR wrapping child component (ContactData) with 'withRouter' to make routing props avail
                        export default withRouter(ContactData);// to make parent's (Checkout) routing props (history, location, match) avail to child (ContactData) component
                     */
                    render={(props) => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;