# Overview

This is a Node.js solution to the SEEK 'checkout system' coding challenge, written in TypeScript. It uses Express for the server and Mocha & Chai for unit testing.

# Usage

To run this solution in development (including ts-node-dev hot reload):

```
npm run start-dev
```

To run the spec tests:

```
npm run test
```

# Example

```bash
aston:Source$ curl http://localhost:8080/SecondBite/checkout/total
{"total":0}
aston:Source$ curl -d '{"item": "classic"}' -H "Content-Type: application/json" -X POST http://localhost:8080/SecondBite/checkout/addItem
aston:Source$ curl http://localhost:8080/SecondBite/checkout/total
{"total":269.99}
```

# In detail

The checkout is implemented with an in-memory data store that has primitive support for multiple customers. The checkout is driven by both a collection of products and a set of per-customer pricing rules, for example quantity deals & price discounts. For now, both of these are also provided from in-memory data stores, although in practice these would be move to a database with a UI to allow the flexibility to change regularly.

# My thought process

This app has been kept intentionally minimalist, while still meeting the requirements, and conforming to a high standard of code quality. However I did consider the following while building it, and in a real world situation I would have validated the assumptions I have made:

- an iterative approach to development. I have built this solution to the specification, but in a fairly minimal fashion, though still to a high quality, with the intention to obtain feedback and iterate. This approach allows me to provide value quickly, to test each iteration thoroughly due to its smaller size, and to get fast feeback.
- 'rolling' quantity deals, e.g. a 3 for 2 deal when there are 8 items. In this case I apply the quantity deal twice, i.e. 6 items for the price of 4, and then 2 items full price.
- handling of customer specific `PricingRule`s, which require flexibility as they are renegiotiated frequently. For this I have made the assumption that rule values will could change frequently, e.g. a 3 for 2 deal becoming a 2 for 1 deal or deals to be stacked together, however the types of rules, quantity deals & discounts, will change less frequently. As such rule values are dynamic and could be changed at run time (assuming a full implementation of the `PricingRuleService`), but rule types require a code change.
- I have made an assumption that there will only be a single `PricingRule` per customer, per product. This was assumption made based on my experience with checkouts in the past.
- I have made an assumption that `PricingRule`s for different products can be stacked and are not mutually exclusive, e.g. if a customer has both a 3 for 2 quantity deal and a product discount then both of these will be applied at checkout, one will not take precedence over the other.
- I have decided to instantiate an instance of `CheckoutService` per customer, which then contains all `PricingRule`s related to that customer. I made this decision based on an assumption that the system is centred around the customer, and ads would be purchased per customer, rather than a bulk order of ads for many customers at once. This seemed to be supported by no mention of a customer in the Checkout sudocode interface. The checkout could be rewritten to centre around an entity that manages multiple customers, by allowing the `CheckoutService` to accept rules for multiple customers, and updating a checkout item to relate to a customer.

# Next steps

If I was to take this solution further, I would:

- move the products & `PricingRule`s from in-memory data stores to a database, with API endpoints to manage them. For example, a NoSQL database like MongoDB could be a good fit for this case, providing simplicity and high performance. Alternatively, a PostgreSQL database might be better if this checkout is being integrated in a larger, more relational, system.
- store the checkout state in the database
- add a UI to update the products & `PricingRule`s
- investigate dependency injection & extend Express with decorators and other infrastructure to improve separation of components
- investigate other ways of passing the current customer to the API, e.g. via a subdomain or authentication header