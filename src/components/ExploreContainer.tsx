import './ExploreContainer.css';
import MyThree from './MyThree/MyThree';
import UnityWebgl from './UnityWebgl/UnityWebgl';
//@ts-ignore
import MindARViewer from './Ar/Ar.jsx'
import { useEffect, useState } from 'react';
import { Browser } from '@capacitor/browser';
import { StatusBar } from '@capacitor/status-bar';
interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [started, setStarted] = useState<string | null>(null);

  const openCapacitorSite = async () => {
    await Browser.open({ url: 'https://hiukim.github.io/mind-ar-js-doc/samples/minimal.html' });
  };

  useEffect(() => {
    Browser.addListener('browserPageLoaded', () => {
      console.log('call');
      window.matchMedia(
        '(display-mode: standalone)'
      ).matches
    })
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
