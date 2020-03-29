This is a Node.js solution to the SEEK 'checkout system' coding challenge, written in TypeScript. It uses Express for the server and Mocha & Chai for unit testing.

The checkout is implemented with an in-memory data store that has primitive support for multiple customers. The checkout is driven by both a collection of products and a set of per-customer pricing rules, for example quantity deals & price discounts. For now both of these are also provided from in-memory data stores, although in practice these would be move to a database to allow the flexibilty to change regularly.

This app has been kept intionally minimalist, while still meeting the requirements, and conforming to a high standard of code quality. If I was to take this solution further I would:
- move the products & pricing rules from in-memory data stores to a database, for example a NoSQL database like MongoDB could be a good fit for this case, providing simplicity and high performance.
- store the checkout state in the database
- add a UI to update the products & pricing rules
- investigate dependency injection & extend Express with decorators and other infrastructure to improve separation of components