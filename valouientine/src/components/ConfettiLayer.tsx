import { createEffect, onCleanup } from "solid-js";

type ConfettiLayerProps = {
  active: boolean;
};

export default function ConfettiLayer(props: ConfettiLayerProps) {
  let canvas!: HTMLCanvasElement;
  let confettiInstance: any;

  const resize = () => {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
  };

  const fire = () => {
    const end = Date.now() + 1600;

    const frame = () => {
      confettiInstance({
        particleCount: 12,
        spread: 90,
        startVelocity: 45,
        ticks: 180,
        origin: { x: Math.random(), y: Math.random() * 0.3 }
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();

    setTimeout(() => {
      confettiInstance({
        particleCount: 300,
        spread: 140,
        startVelocity: 60,
        ticks: 220,
        origin: { x: 0.5, y: 0.55 }
      });
    }, 300);
  };

  createEffect(async () => {
    if (!props.active) return;

    // lazy-load only when needed
    const { default: confetti } = await import("canvas-confetti");

    resize();

    confettiInstance = confetti.create(canvas, {
      resize: false,
      useWorker: true
    });

    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", () =>
      setTimeout(resize, 150)
    );

    fire();
  });

  onCleanup(() => {
    window.removeEventListener("resize", resize);
  });

  return (
    <canvas
      ref={canvas}
      class="pointer-events-none fixed inset-0 z-50 w-screen h-screen"
    />
  );
}