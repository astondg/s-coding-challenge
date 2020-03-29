import { PricingRuleService } from "./services/pricingRuleService";
import { CheckoutService } from "./services/checkoutService";

// TODO - move all of this to a DI resolver
const pricingRuleService:PricingRuleService = new PricingRuleService();
const checkoutServices:Map<string, CheckoutService> = new Map<string, CheckoutService>();

export function getCheckoutServiceForCustomer(customer: string): CheckoutService {
  let checkoutService: CheckoutService;
  if (checkoutServices.has(customer)) {
    checkoutService = checkoutServices.get(customer);
  } else {
    const rules = pricingRuleService.find(customer);
    checkoutService = new CheckoutService(rules);
    checkoutServices.set(customer, checkoutService);
  }

  return checkoutService;
}