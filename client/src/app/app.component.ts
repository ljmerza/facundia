import { Component } from '@angular/core';
import { routeAnimations } from './core';

import {environment as env} from '@env/environment';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent {
  title = 'client';
  faRocket = faRocket;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  
}
