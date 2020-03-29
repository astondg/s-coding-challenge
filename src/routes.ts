import express from "express";
import { CheckoutController } from "./controllers/checkoutController";
import { getCheckoutServiceForCustomer } from './checkoutResolver';

export function registerRoutes(app: express.Application) {
  // Checkout routes
  app.post("/:customer/checkout/addItem", express.json(), (req, res) => {
    const customer = req.params.customer;
    const checkoutService = getCheckoutServiceForCustomer(customer);
    const controller = new CheckoutController(checkoutService);

    controller.addItem(req, res);
  });
  app.get("/:customer/checkout/total", (req, res) => {
    const customer = req.params.customer;
    const checkoutService = getCheckoutServiceForCustomer(customer);
    const controller = new CheckoutController(checkoutService);

    controller.total(req, res);
  });
};