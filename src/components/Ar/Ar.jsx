import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default () => {
    const sceneRef = useRef(null);

    useEffect(() => {
        const sceneEl = sceneRef.current;

            const arSystem = sceneEl.systems["mindar-image-system"];
            sceneEl.addEventListener('renderstart', () => {
                arSystem.start(); // start AR 
            });

        return () => {
            // arSystem.stop();
        }
    }, []);

    return (
        // @ts-ignore
        <a-scene ref={sceneRef} mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
            {/* @ts-ignore */}

            <a-assets>
                <img id="card" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.png" />
                {/* @ts-ignore */}
                <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item>
                {/* @ts-ignore */}

            </a-assets>
            {/* @ts-ignore */}

            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
            {/* @ts-ignore */}
            <a-entity mindar-image-target="targetIndex: 0">
                {/* @ts-ignore */}

                <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
                {/* @ts-ignore */}
                <a-gltf-model rotation="0 0 0 " position="0 0 0.1" scale="0.005 0.005 0.005" src="#avatarModel" animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"></a-gltf-model>
                {/* @ts-ignore */}

            </a-entity>
            {/* @ts-ignore */}
        </a-scene>
    )
}