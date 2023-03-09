/* globals PIXI */

const addMusic = (id, file) => PIXI.sound.add(id, file);

const playMusic = (id) => PIXI.sound.play(id);

export {
    addMusic,
    playMusic
};
