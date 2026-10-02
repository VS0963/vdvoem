import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { Welcome, Test, Result, Match, Home, Persik } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.WELCOME } = useActiveVkuiLocation();
  const routerNavigator = useRouteNavigator();
  const [fetchedUser, setUser] = useState();
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('test_answers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return {}; }
    }
    return {};
  });

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
    }
    fetchData();
  }, []);

  const go = (panel) => routerNavigator.push(`/${panel}`);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Welcome id="welcome" go={go} />
          <Test id="test" go={go} setAnswers={setAnswers} />
          <Result id="result" go={go} answers={answers} />
          <Match id="match" go={go} answers={answers} />
          <Home id="home" fetchedUser={fetchedUser} />
          <Persik id="persik" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};