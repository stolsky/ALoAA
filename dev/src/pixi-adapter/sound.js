import { sound } from "@pixi/sound";

const addMusic = (id, file) => sound.add(id, file);

const playMusic = (id) => sound.play(id);

export {
    addMusic,
    playMusic
};
