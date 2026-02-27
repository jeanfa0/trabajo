import { Routes } from '@angular/router';

import { Home }     from './pages/home/home';
import { About }    from './pages/about/about';
import { Services } from './pages/services/services';
import { Blog }     from './pages/blog/blog';
import { Contact }  from './pages/contact/contact';
import { Shop }     from './pages/shop/shop';

export const routes: Routes = [
  { path: '',          component: Home },
  { path: 'nosotros',  component: About },
  { path: 'servicios', component: Services },
  { path: 'blog',      component: Blog },
  { path: 'contacto',  component: Contact },
  { path: 'shop',      component: Shop }
];