import NotFound404 from '../views/pages/404';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import Home from '../views/pages/home';

const routes = {
  '/': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail,
  '/detail/:id/#Menus': Detail,
  '/404': NotFound404,
};

export default routes;
