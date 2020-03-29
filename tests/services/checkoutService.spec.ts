import { expect } from 'chai';
import 'mocha';

import {CheckoutService} from '../../src/services/checkoutService';
import { PricingRule } from '../../src/interfaces/pricingRule';

describe('When the pricing rule has an invalid type', () => {
  const rules = new Map<string, PricingRule>([
    ['classic', { type: 'unknown-type', triggerValue: 3, newValue: 2 }]
  ]);

  it('should raise an error', () => {
    let checkout = new CheckoutService(rules);
    checkout.add('classic');
    expect(checkout.total.bind(checkout)).to.throw('unknown pricing rule type')
  });
});

describe('When there are no pricing rules for ads', () => {
  describe('And the user is purchasing single quantities of items', () => {
    it('should not apply any discounts', () => {
      let checkout = new CheckoutService();
      checkout.add('classic');
      checkout.add('standout');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(987.97)
    });
  });
  describe('And the user is purchasing many of the same item', () => {
    it('should not apply any discounts', () => {
      let checkout = new CheckoutService();
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(1204.96)
    });
  });
});

describe('When there is a quantity deal on ads', () => {
  const rules = new Map<string, PricingRule>([
    ['classic', { type: 'quantity', triggerValue: 3, newValue: 2 }]
  ]);

  describe('And the user is purchasing single quantities of items', () => {
    it('should not apply a discount', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('classic');
      checkout.add('standout');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(987.97)
    });
  });
  describe('And the user is purchasing the discounted quantity of the item', () => {
    it('should apply the quantity discount‬', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(934.97)
    });
  });
  describe('And the user is purchasing a large quantity of a different item', () => {
    it('should not apply the discount', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('standout');
      checkout.add('standout');
      checkout.add('standout');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(1363.96)
    });
  });  
  describe('And the user is purchasing 2 or more times the quantitiy deal', () => {
    it('should apply the discount to every multiple of the quantity deal', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      const result = checkout.total()
      expect(result).to.equal(1619.94)
    });
  });
});

describe('When there is a discount ads', () => {
  const rules = new Map<string, PricingRule>([
    ['standout', { type: 'cost', newValue: 299.99 }]
  ]);

  describe('And the user is purchasing the discounted item', () => {
    it('should apply the discount only to the discounted item', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('classic');
      checkout.add('standout');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(964.97)
    });
  });
  describe('And the user is purchasing other items', () => {
    it('should not apply the discount‬', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(1204.96)
    });
  });
  describe('And the user is purchasing many of the discounted item', () => {
    it('should apply the discount only to each of the discounted item', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('standout');
      checkout.add('standout');
      checkout.add('standout');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(1294.96)
    });
  });
});

describe('When there is both a quantity deal on ads AND a discount ads', () => {
  const rules = new Map<string, PricingRule>([
    ['standout', { type: 'quantity', triggerValue: 5, newValue: 4 }],
    ['premium', { type: 'cost', newValue: 389.99 }]
  ]);

  describe('And the user is purchasing the discounted item', () => {
    it('should apply the discount only to the discounted item', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('classic');
      checkout.add('standout');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(982.97)
    });
  });
  describe('And the user is purchasing the discounted item and multiple of another item', () => {
    it('should apply the discount only to the discounted item', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('classic');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(1199.96)
    });
  });
  describe('And the user is purchasing the quantity deal item and another item', () => {
    it('should apply the quantity deal to only to the quantity deal item', () => {
      let checkout = new CheckoutService(rules);
      checkout.add('standout');
      checkout.add('standout');
      checkout.add('standout');
      checkout.add('standout');
      checkout.add('standout');
      checkout.add('premium');
      const result = checkout.total()
      expect(result).to.equal(1681.95)
    });
  });
});