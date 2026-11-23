"use strict";

const get = id => document.getElementById(id);
const cad = window.mitcad;
let current = 0;
let ready = false;
let audio;
let heardRefusal = false;

function feedback(success) {
  if (!audio || !get("sound").checked) return;
  const notes = success ? [523.25, 659.25] : [220];
  notes.forEach((frequency, index) => {
    const start = audio.currentTime + 0.08 * index;
    const oscillator = audio.createOscillator();
    const volume = audio.createGain();
    oscillator.frequency.value = frequency;
    volume.gain.setValueAtTime(0.065, start);
    volume.gain.exponentialRampToValueAtTime(0.001, start + 0.14);
    oscillator.connect(volume).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.14);
  });
}

function recover(message) {
  ready = false;
  get("status").textContent = message;
  get("resume").hidden = false;
}

async function show() {
  const [chapter, title, text, concept, target, done, allow = []] = steps[current];
  const id = "meet-" + (current + 1);
  ready = true;
  heardRefusal = false;
  get("resume").hidden = true;
  get("chapter").textContent = chapter;
  get("count").textContent = (current + 1) + " / " + steps.length;
  get("progress").max = steps.length;
  get("progress").value = current;
  get("heading").textContent = title;
  get("instruction").textContent = text;
  get("concept").textContent = concept;
  try {
    await cad.startStep({id, text, target, done, allow});
  } catch (error) {
    if (id === "meet-" + (current + 1)) recover("MITCAD could not show the guide. " + error.message);
  }
}

if (!cad) {
  get("begin").disabled = true;
  get("begin").textContent = "Open from MITCAD Tutorials";
} else {
  cad.on("step_done", event => {
    if (!ready || event.step !== "meet-" + (current + 1)) return;
    ready = false;
    feedback(true);
    console.log("mitcad:tutorial:done " + event.step);
    current += 1;
    if (current === steps.length) {
      get("task").hidden = true;
      get("complete").hidden = false;
      console.log("mitcad:tutorial:finished");
      return;
    }
    get("status").textContent = "Step completed.";
    void show();
  });
  cad.on("refused", event => {
    if (!ready || event.step !== "meet-" + (current + 1)) return;
    get("status").textContent = "Follow the highlighted instruction first.";
    if (!heardRefusal) feedback(false);
    heardRefusal = true;
  });
  cad.on("step_left", event => {
    if (event.reason === "escape" && event.step === "meet-" + (current + 1)) {
      recover("Guide paused. Keep the design at this step, then show the guide again.");
    }
  });
  get("begin").addEventListener("click", () => {
    if (window.AudioContext && get("sound").checked) {
      audio = new AudioContext();
      void audio.resume().catch(() => {});
    }
    get("welcome").hidden = true;
    get("task").hidden = false;
    void show();
  });
  get("resume").addEventListener("click", () => {
    get("status").textContent = "";
    void show();
  });
}

