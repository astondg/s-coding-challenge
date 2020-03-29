import { PricingRule } from '../interfaces/pricingRule';

export class PricingRuleService {
  private pricingRules: Map<string, Map<string, PricingRule>>;

  constructor() {
    this.pricingRules = new Map([[
      'SecondBite', new Map<string, PricingRule>([['classic', { type: 'quantity', triggerValue: 3, newValue: 2 }]])
    ], [
      'Axil Coffee Roasters', new Map<string, PricingRule>([['standout', { type: 'cost', newValue: 299.99 }]])
    ], [
      'MYER', new Map<string, PricingRule>([
        ['standout', { type: 'quantity', triggerValue: 5, newValue: 4 }],
        ['premium', { type: 'cost', newValue: 389.99 }]
      ])
    ]]);
  }

  find(customer: string) {
    return this.pricingRules.get(customer);
  }
}