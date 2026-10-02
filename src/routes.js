import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

import { Welcome, Test, Result, Match, Home, Persik, Application } from './panels';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  WELCOME: 'welcome',
  TEST: 'test',
  RESULT: 'result',
  MATCH: 'match',
  HOME: 'home',
  PERSIK: 'persik',
  APPLICATION: 'application',
};

export const routes = RoutesConfig.create({
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.WELCOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.TEST, '/' + DEFAULT_VIEW_PANELS.TEST, []),
      createPanel(DEFAULT_VIEW_PANELS.RESULT, '/' + DEFAULT_VIEW_PANELS.RESULT, []),
      createPanel(DEFAULT_VIEW_PANELS.MATCH, '/' + DEFAULT_VIEW_PANELS.MATCH, []),
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/' + DEFAULT_VIEW_PANELS.HOME, []),
      createPanel(DEFAULT_VIEW_PANELS.PERSIK, '/' + DEFAULT_VIEW_PANELS.PERSIK, []),
      createPanel(DEFAULT_VIEW_PANELS.APPLICATION, '/' + DEFAULT_VIEW_PANELS.APPLICATION, []),
    ]),
  ]),
});

export const router = createHashRouter(routes.getRoutes());
