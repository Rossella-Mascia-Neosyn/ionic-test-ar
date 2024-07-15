import './ExploreContainer.css';
import MyThree from './MyThree/MyThree';
import UnityWebgl from './UnityWebgl/UnityWebgl';
//@ts-ignore
import MindARViewer from './Ar/Ar.jsx'
import { useEffect, useState } from 'react';
import { Browser } from '@capacitor/browser';
import { StatusBar, Style } from '@capacitor/status-bar';
interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [started, setStarted] = useState<string | null>(null);

  const openCapacitorSite = async () => {
    await Browser.open({ url: 'https://hiukim.github.io/mind-ar-js-doc/samples/minimal.html' });
  };

  // Display content under transparent status bar (Android only)
  StatusBar.setOverlaysWebView({ overlay: true });

  const setStatusBarStyleDark = async () => {
    await StatusBar.setStyle({ style: Style.Dark });
  };

  const setStatusBarStyleLight = async () => {
    await StatusBar.setStyle({ style: Style.Light });
  };

  const hideStatusBar = async () => {
    await StatusBar.hide();
  };

  const showStatusBar = async () => {
    await StatusBar.show();
  };

  useEffect(() => {
    Browser.addListener('browserPageLoaded', () => {
      // setStatusBarStyleDark()
      setStatusBarStyleLight()
      hideStatusBar()
      // showStatusBar()
    })
    setStatusBarStyleLight()
    hideStatusBar()
  }, [])
  return (
    <div id="container">
      <div className="control-buttons">
        {started === null && <button onClick={() => { setStarted('aframe') }}>Start AFRAME version</button>}
        <button onClick={openCapacitorSite}>open browser</button>
        {started !== null && <button onClick={() => { setStarted(null) }}>Stop</button>}
      </div>
      {started === 'aframe' && (
        <div className="container">
          <MindARViewer />
          <video></video>
        </div>
      )}
    </div>
  );
};

export default ExploreContainer;
