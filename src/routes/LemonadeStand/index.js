import AddressRoute from './routes/Address';
// import Dashboard from './containers/Dashboard';
import { injectReducer } from '../../store/reducers';

export default function LemonadeStandRoute(store) {
  return {
    path: 'dashboard',
    // indexRoute: '',
    // component: Dashboard,
    /*  Async getComponent is only invoked when route matches   */
    getComponent(nextState, cb) {
      /*  Webpack - use 'require.ensure' to create a split point
       and embed an async module loader (jsonp) when bundling   */
      require.ensure(
        [],
        require => {
          /*  Webpack - use require callback to define
         dependencies for bundling   */
          const Dashboard = require('./containers/Dashboard').default;
          const reducer = require('./modules/bitcoinAddresses').default;

          /*  Add the reducer to the store on key 'counter'  */
          injectReducer(store, { key: 'bitcoinAddresses', reducer });

          /*  Return getComponent   */
          cb(null, Dashboard);

          /* Webpack named bundle   */
        },
        'lemonadeStand'
      );
    },
    childRoutes: [AddressRoute()]
  };
}
