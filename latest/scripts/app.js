const gameContainer = document.querySelector("#gameContainer");

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

if (isMobileDevice()) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes, viewport-fit=cover';
    document.head.appendChild(meta);
    document.body.style.position = 'fixed';
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';
}

function initializeGame() {
    if (typeof createUnityInstance === 'undefined') {
        setTimeout(initializeGame, 100);
        return;
    }

    createUnityInstance(gameContainer, {
        dataUrl: "Build/Crate Escape.data.unityweb",
        frameworkUrl: "Build/Crate Escape.framework.js.unityweb",
        codeUrl: "Build/Crate Escape.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "EkHypnon",
        productName: "Crate Escape",
        productVersion: "0.0.0.33",
    }).then((unityInstance) => {
        console.log("Unity instance created successfully");

        if (isMobileDevice()) {
            const enableFullscreenOnInteraction = () => {
                unityInstance.SetFullscreen(1);
                document.removeEventListener('click', enableFullscreenOnInteraction);
                document.removeEventListener('touchstart', enableFullscreenOnInteraction);
            };
            document.addEventListener('click', enableFullscreenOnInteraction);
            document.addEventListener('touchstart', enableFullscreenOnInteraction);
        }
    }).catch((message) => {
        console.error("Failed to load Unity WebGL instance:", message);
    });
}

initializeGame();
