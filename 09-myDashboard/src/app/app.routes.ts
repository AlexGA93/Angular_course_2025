import { Routes, Route } from '@angular/router';

interface RouteWithIcon extends Route {
  icon?: string;
  children?: RouteWithIcon[];
}

export const routes: RouteWithIcon[] = [
  {
    path: "dashboard",
    /* Al haber definido el componente DashboardComponent como export DEFAULT ya no necesitamos importarlo en el then() */
    loadComponent: () => import('./dashboard/dashboard.component'), // .then(component => component.DashboardComponent),
    /* Rutas hijas de /dashboard/* */
    children: <RouteWithIcon[]>[
      // /change-detection
      {
        path: "change-detection",
        title: "Change Detection",
        icon: "brick-wall-shield",
        loadComponent: () => import('./dashboard/pages/change-detection/change-detection.component')
      },
      // /control-flow
      {
        path: "control-flow",
        title: "Control Flow",
        icon: "git-graph",
        loadComponent: () => import('./dashboard/pages/control-flow/control-flow.component')
      },
      // /defer-options
      {
        path: "defer-options",
        title: "Defer Options",
        icon:"logs",
        loadComponent: () => import('./dashboard/pages/defer-options/defer-options.component')
      },
      // /defer-views
      {
        path: "defer-views",
        title: "Defer Views",
        icon:"view",
        loadComponent: () => import('./dashboard/pages/defer-views/defer-views.component')
      },
      // /user/:id
      {
        path: "user/:id",
        title: "User View",
        icon:"user",
        loadComponent: () => import('./dashboard/pages/user/user.component')
      },
      // /user-list
      {
        path:"user-list",
        title: "User List",
        icon:"users",
        loadComponent: () => import('./dashboard/pages/users/users.component')
      },
      // /view-transition
      {
        path: "view-transition",
        title: "View Transition",
        icon:"arrow-left-right",
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
