import { OvMind } from "ovmind/OvMind";

export const loop = () => {
  console.log(`Current game tick is ${Game.time}`);
  if (!OvMind.getInstance().inited) OvMind.getInstance().init();
  OvMind.getInstance().run();
  console.log('-----------------------------------');
};
