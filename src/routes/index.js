import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import LemonadeStandRoute from './LemonadeStand';

/*  react-router - PlainRoute Object */
export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [LemonadeStandRoute(store)]
});

export default createRoutes;
