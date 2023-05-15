import { loadStripe } from '@stripe/stripe-js';

let stripePromise:any;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51N6qlXB6vEmDvOeAHR7U7MrVRAgh5A7BpvTEVl86wX4Ea519nhgrgQ3PcI833QQnmy1I0jEqn36xSciinxXh0ZbS00HBAqapwa');
  }
  return stripePromise;
};

export default getStripe;