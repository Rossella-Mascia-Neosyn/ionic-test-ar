import { IonApp, IonButton, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';
import './theme/tailwind.css';

/* Theme variables */
// import './theme/variables.css';
import MyThree from './components/MyThree/MyThree';
import { useTenant } from './context/Tentant';
import { useEffect, useLayoutEffect } from 'react';

setupIonicReact();

const App: React.FC<{ tenantName: string }> = ({ tenantName }) => {
  useLayoutEffect(() => {
    if (!tenantName) return;
    // Dynamically import the theme CSS file
    import(`../tenant/${tenantName}/style/variables.css`)
      .then(() => {
        try {
          // do stuff after
          // setVisible(true);
          console.warn("stuff success.");

        } catch (e) {
          console.warn("stuff failed.");
        }
      })
      .catch((err) => {
        console.warn("Failed CSS import: ", err);
      });
  }, [tenantName]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <img src={`../tenant/${tenantName}/assets/logo.png`} style={{ height: '20%', width: 'auto' }} />
          <button className='bg-primary rounded'>tailwind</button>
          <div className="flex">
            <div className="w-14">
              01
            </div>
            <div className="flex-initial w-64">
              02
            </div>
            <div className="flex-initial w-32">
              03
            </div>
          </div>
          <IonButton color="primary">ciao</IonButton>
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/museo/Inbox" />
            </Route>
            <Route path="/museo/:name" exact={true}>
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
