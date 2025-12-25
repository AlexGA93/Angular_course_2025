import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "dashboard",
    /* Al haber definido el componente DashboardComponent como export DEFAULT ya no necesitamos importarlo en el then() */
    loadComponent: () => import('./dashboard/dashboard.component'), // .then(component => component.DashboardComponent),
    /* Rutas hijas de /dashboard/* */
    children: [
      // /change-detection
      {
        path: "change-detection",
        title: "Change Detection",
        loadComponent: () => import('./dashboard/pages/change-detection/change-detection.component')
      },
      // /control-flow
      {
        path: "control-flow",
        title: "Control Flow",
        loadComponent: () => import('./dashboard/pages/control-flow/control-flow.component')
      },
      // /defer-options
      {
        path: "defer-options",
        title: "Defer Options",
        loadComponent: () => import('./dashboard/pages/defer-options/defer-options.component')
      },
      // /defer-views
      {
        path: "defer-views",
        title: "Defer Views",
        loadComponent: () => import('./dashboard/pages/defer-views/defer-views.component')
      },
      // /user/:id
      {
        path: "user/:id",
        title: "User View",
        loadComponent: () => import('./dashboard/pages/user/user.component')
      },
      // /user-list
      {
        path:"user-list",
        title: "User List",
        loadComponent: () => import('./dashboard/pages/users/users.component')
      },
      // /view-transition
      {
        path: "view-transition",
        title: "View Transition",
        loadComponent: () => import('./dashboard/pages/view-transition/view-transition.component')
      },
      // comodin
      {
        path: "",
        redirectTo: "control-flow",
        pathMatch: "full",
      }
    ]
  },
  /* Ruta por defecto */
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  }
];
