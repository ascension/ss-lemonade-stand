import AddressRoute from './routes/Address';

export default function LemonadeStandRoute(store) {
  return {
    path: 'dashboard',
    indexRoute: '',
    component: '',
    childRoutes: [
      AddressRoute()
    ]
  };
}
