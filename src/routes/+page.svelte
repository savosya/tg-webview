<script lang="typescript">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Loader from "../components/loader/index.svelte";
    import Button from "../components/button/index.svelte";
    import CameraIcon from "../components/icons/camera.svelte";
    import { sendPhotoToTelegramRequest } from "../api/sendPhotoToTelegramRequest";
    import type { State } from "./page.types";
    import { isMediaDevicesSupported } from "../utils/mediaApiUtils";
    import { getRatio } from "../utils/windowUtils";
    import { addWatermark } from "../utils/watermarkUtils";

    const chatId = $page.url.searchParams.get("chatId");

    let videoSource: HTMLVideoElement | null = null;
    let canvasElem: HTMLCanvasElement | null = null;
    let imgElem: HTMLImageElement | null = null;
    let loadingPage: boolean = true;
    let loading: boolean = false;

    let Page: State = {
        photo: null,
        state: "camera",
    };

    onMount(() => {
        if (isMediaDevicesSupported()) {
            initCamera();
        } else {
            Page.state = "error";
            alert("Media devices API is not supported.");
        }
    });

    const initCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: "environment",
                    aspectRatio: getRatio(),
                },
            });

            if (!videoSource) return;

            videoSource.srcObject = stream;
            videoSource.play();

            Page.state = "camera";
        } catch (error) {
            alert(JSON.stringify(error));
            console.log(error);
            Page.state = "error";
        }

        loadingPage = false;
    };

    async function onCapture() {
        if (!videoSource || !canvasElem || !imgElem) return;

        canvasElem.width = videoSource.videoWidth;
        canvasElem.height = videoSource.videoHeight;
        canvasElem.getContext("2d")?.drawImage(videoSource, 0, 0);

        canvasElem = addWatermark(canvasElem, {});

        const dataURL = canvasElem.toDataURL();

        imgElem.src = dataURL;

        Page.state = "photo";
    }

    function retakePhoto() {
        Page.state = "camera";
    }

    async function sendPhoto() {
        if (!canvasElem) return;
        loading = true;

        canvasElem.toBlob((imageBlob) => {
            sendPhotoToTelegramRequest({ chatId, imageBlob })
                .then(() => {
                    retakePhoto();
                })
                .finally(() => {
                    loading = false;
                });
        });
    }
</script>

<div class="wrapper">
    {#if Page.state !== "error"}
        {#if loadingPage}
            <div class="loader">
                <Loader />
            </div>
        {/if}

        <div
            class="container"
            class:hidden={Page.state !== "camera" || loadingPage}
        >
            <!-- svelte-ignore a11y-media-has-caption -->
            <video bind:this={videoSource} autoplay />
            <Button on:click={onCapture} class="centered" circle>
                <CameraIcon slot="icon" />
            </Button>
        </div>

        <div class="container" class:hidden={Page.state !== "photo"}>
            <canvas bind:this={canvasElem} />
            <img bind:this={imgElem} alt={"photo"} />

            <div class="right">
                <Button on:click={retakePhoto}>
                    <span slot="text">Переснять</span>
                </Button>

                <Button on:click={sendPhoto} {loading}>
                    <span slot="text">Отправить</span>
                </Button>
            </div>
        </div>
    {:else}
        <div>Ошибка</div>
    {/if}
</div>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .loader {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .hidden {
        display: none;
    }

    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    video,
    canvas,
    img {
        width: 100%;
        height: 100%;
    }

    canvas {
        display: none;
    }

    :global(.centered) {
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
    }

    :global(.right) {
        position: absolute;
        bottom: 60px;
        right: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>
