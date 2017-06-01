import AddressRoute from './routes/Address';
import Dashboard from './containers/Dashboard';

export default function LemonadeStandRoute(store) {
  return {
    path: 'dashboard',
    indexRoute: '',
    component: Dashboard,
    childRoutes: [
      AddressRoute()
    ]
  };
}
