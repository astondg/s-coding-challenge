import {PricingRule} from '../interfaces/pricingRule';

export class CheckoutService {
    readonly pricingRules: Map<string, PricingRule>;
    readonly items: Map<string, number>;
    readonly productCosts: Map<string, number> = new Map([
      ['classic', 269.99],
      ['standout', 322.99],
      ['premium', 394.99]
    ]);

    constructor(pricingRules?: Map<string, PricingRule>) {
      this.pricingRules = pricingRules;
      this.items = new Map();
    }

    add(item: string) {
      const existingItemQuantity = this.items.get(item) || 0;
      this.items.set(item, existingItemQuantity+1);
    }

    total(): number {
      let totalCost = 0;

      for (const item of this.items) {
        const productCost = this.productCosts.get(item[0]);
        const pricingRule = this.pricingRules ? this.pricingRules.get(item[0]) : null;

        if (pricingRule) {
          // TODO - when more complexity is added to this it can be refactored
          switch (pricingRule.type) {
            case 'cost':
              totalCost += pricingRule.newValue * item[1];
              break;
            case 'quantity':
              const ruleQuantities = Math.trunc(item[1] / pricingRule.triggerValue);
              const remainingQuantities = item[1] % pricingRule.triggerValue;
              const newQuantity = (ruleQuantities * pricingRule.newValue) + remainingQuantities;
              totalCost += productCost * newQuantity;
              break;
            default:
              throw new Error('unknown pricing rule type');
          }
        } else {
          totalCost += productCost * item[1];
        }
      }

      return totalCost;
    }
  }