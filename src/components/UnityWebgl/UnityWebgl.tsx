import React, { useCallback, useEffect, useState } from "react";
import styles from "./UnityWebgl.module.css";
import { Unity, useUnityContext } from "react-unity-webgl";

export type UnityWebglProps = {

}
const UnityWebgl: React.FC<UnityWebglProps> = () => {

    const {
        unityProvider,
        isLoaded,
        loadingProgression,
        sendMessage,
        addEventListener,
        removeEventListener,
        requestFullscreen,
        takeScreenshot,
        unload,
    } = useUnityContext({
        loaderUrl: "/unitybuild/crateclicker.loader.js",
        dataUrl: "/unitybuild/crateclicker.data",
        frameworkUrl: "/unitybuild/crateclicker.framework.js",
        codeUrl: "/unitybuild/crateclicker.wasm",
        webglContextAttributes: {
            preserveDrawingBuffer: true,
        },
        // loaderUrl: "/arbuild/ar-example.loader.js",
        // dataUrl: "/arbuild/ar-example.data",
        // frameworkUrl: "/arbuild/ar-example.framework.js",
        // codeUrl: "/arbuild/ar-example.wasm",
        // webglContextAttributes: {
        //     preserveDrawingBuffer: true,
        // },
    });

    const [isPlaying, setIsPlaying] = useState(false);
    const [screenshotDatas, setScreenshotDatas] = useState<string[]>([]);
    const [scores, setScores] = useState<[number, number][]>([]);

    const handleClickStartGame = (time: number) => {
        if (isLoaded === false || isPlaying === true) {
            return;
        }
        setIsPlaying(true);
        sendMessage("GameController", "StartGame", time);
    };

    const handleClickFullscreen = () => {
        if (isLoaded === false) {
            return;
        }
        requestFullscreen(true);
    };
    const handleRemoveClickFullscreen = () => {
        if (isLoaded === false) {
            return;
        }
        requestFullscreen(false);
    };

    const handleClickScreenshot = () => {
        if (isLoaded === false) {
            return;
        }
        const screenshotData = takeScreenshot();
        if (screenshotData !== undefined) {
            setScreenshotDatas([screenshotData, ...screenshotDatas]);
        }
    };

    const handleClickUnload = async () => {
        if (isLoaded === false) {
            return;
        }
        try {
            await unload();
            console.log("Unload success");
        } catch (error) {
            console.error(`Unable to unload: ${error}`);
        }
    };

    const handleGameOver = useCallback(
        (time: number, score: number) => {
            time = Math.round(time);
            setIsPlaying(false);
            setScores([[time, score], ...scores]);
        },
        [scores]
    );

    useEffect(() => {
        //@ts-ignore
        addEventListener("GameOver", handleGameOver);
        return () => {
            //@ts-ignore
            removeEventListener("GameOver", handleGameOver);
        };
    }, [handleGameOver, addEventListener, removeEventListener]);

    return (
        <div className={styles.container}>
            <h1>Crate Clicker!</h1>
            <div className={styles.unityWrapper}>
                {isLoaded === false && (
                    <div className={styles.loadingBar}>
                        <div
                            className={styles.loadingBarFill}
                            style={{ width: loadingProgression * 100 }}
                        />
                    </div>
                )}
                <Unity
                    unityProvider={unityProvider}
                    style={{ display: isLoaded ? "block" : "none" }}
                />
                <button onClick={handleRemoveClickFullscreen} style={{ position: 'fixed', top: 0, left: 0 }}>Remove</button>
            </div>
            <div className="buttons">
                <button onClick={() => handleClickStartGame(5)}>
                    Start Short Game
                </button>
                <button onClick={() => handleClickStartGame(10)}>
                    Start Long Game
                </button>
                <button onClick={handleClickFullscreen}>Fullscreen</button>
                <button onClick={handleClickScreenshot}>Screenshot</button>
                <button onClick={handleClickUnload}>Unload</button>
            </div>
            <h2>Scores</h2>
            <ul>
                {scores.map(([time, score]) => (
                    <li key={time}>
                        {score} points with {time} seconds left!
                    </li>
                ))}
            </ul>
            <h2>Screenshots</h2>
            <div className={styles.screenshots}>
                {screenshotDatas.map((data, index) => (
                    <img width={250} key={index} src={data} alt="Screenshot" />
                ))}
            </div>
        </div>
    );
};
export default UnityWebgl;