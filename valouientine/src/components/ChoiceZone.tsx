import { createSignal } from "solid-js";

type ChoiceZoneProps = {
  hidden: boolean;
  onYes: () => void;
};

type NoButtonProps = {
  zone: HTMLDivElement;
  onEvade?: () => void;
};

type YesButtonProps = {
  scale: number;
  onClick: () => void;
};

function YesButton(props: YesButtonProps) {
  return (
    <button
      onClick={props.onClick}
      style={{ transform: `translateY(-50%) scale(${props.scale})` }}
      class="absolute left-[18%] top-1/2 -translate-y-1/2 rounded-full bg-pink-500 px-6 py-4 text-lg font-extrabold text-white shadow-xl transition-transform duration-200 hover:bg-pink-600"
    >
      Yes
    </button>
  );
}

function NoButton(props: NoButtonProps) {
  let btn!: HTMLButtonElement;

  const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

  const moveAway = (px: number, py: number) => {
    const z = props.zone.getBoundingClientRect();
    const b = btn.getBoundingClientRect();

    let dx = b.left + b.width / 2 - px;
    let dy = b.top + b.height / 2 - py;
    const mag = Math.hypot(dx, dy) || 1;

    dx /= mag;
    dy /= mag;

    let left = b.left - z.left + dx * 150;
    let top = b.top - z.top + dy * 150;

    left = clamp(left, 0, z.width - b.width);
    top = clamp(top, 0, z.height - b.height);

    btn.style.left = `${left}px`;
    btn.style.top = `${top}px`;
    btn.style.transform = "none";

    props.onEvade?.();
  };

  const onPointerMove = (e: PointerEvent) => {
    const b = btn.getBoundingClientRect();
    const distance = Math.hypot(
      b.left + b.width / 2 - e.clientX,
      b.top + b.height / 2 - e.clientY,
    );

    if (distance < 140) {
      moveAway(e.clientX, e.clientY);
    }
  };

  return (
    <button
      ref={btn}
      onPointerMove={onPointerMove}
      onClick={(e) => e.preventDefault()}
      class="absolute left-[62%] top-1/2 -translate-y-1/2 rounded-full bg-gray-200 px-6 py-4 text-lg font-extrabold text-gray-900 shadow-xl"
    >
      No
    </button>
  );
}

export default function ChoiceZone(props: ChoiceZoneProps) {
  let zone!: HTMLDivElement;
  let yesBtn!: HTMLButtonElement;

  // Signal for Yes button scale
  const [yesScale, setYesScale] = createSignal(1);

  const growYes = () => {
    setYesScale((prev) => Math.min(prev + 0.2, 4));
  };

  return (
    <div
      ref={zone}
      class={`relative mx-auto h-37 w-full max-w-md touch-none ${
        props.hidden ? "hidden" : ""
      }`}
    >
      <YesButton onClick={props.onYes} scale={yesScale()} />

      <NoButton zone={zone} onEvade={growYes} />
    </div>
  );
}
