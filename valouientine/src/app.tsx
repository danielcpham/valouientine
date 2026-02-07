import "./app.css";

import { clientOnly } from "@solidjs/start";

import { createSignal } from "solid-js";
import "./app.css";
import Animal from "./components/Animal";
import ChoiceZone from "./components/ChoiceZone";

const ConfettiLayer = clientOnly(() => import("./components/ConfettiLayer"));

export default function App() {

  const [accepted, setAccepted] = createSignal(false);

  const handleYes = () =>{ setAccepted(true);};

  return (
    <div>
      <ConfettiLayer active={accepted()} />

      <main class="card">
        <Animal />

        <h1>louie will you be my valentine?</h1>

        <ChoiceZone hidden={accepted()} onYes={handleYes} />

        {!accepted() && (
          <div class="hint">
            “No” seems a bit shy 😈
          </div>)}
  

        {accepted() && (
          <div class="mt-6 animate-[pop_.35s_ease]">
            <h2 class="mb-2 text-4xl font-extrabold">YAY! 🎉</h2>
            <img
              class="mx-auto w-95"
              src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
              alt="Fireworks"
            />
          </div>
        )}

      </main>
    </div>
  );
}
