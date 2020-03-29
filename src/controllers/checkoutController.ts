import { Request, Response } from 'express';

import { CheckoutService } from '../services/checkoutService';

export class CheckoutController {
  private checkoutService: CheckoutService;

  constructor(checkoutService: CheckoutService) {
    this.checkoutService = checkoutService;
  }

  addItem(req: Request, res: Response) {
    try {
      this.checkoutService.add(req.body.item)
      res.status(201).end();
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  total(req: Request, res: Response) {
    try {
      res.status(200).send({total: this.checkoutService.total()});
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}