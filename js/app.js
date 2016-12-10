/* global PIXI, document, window */

const renderer = PIXI.autoDetectRenderer(
  512,
  512,
  {
    antialias: false,
    transparent: false,
    resolution: 1
  }
);

renderer.view.style.border = '3px solid #666';
renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

function setup() {
  const toad = new PIXI.Sprite(
    PIXI.loader.resources['sprites/Battletoads.png'].texture
  );

  stage.addChild(toad);

  renderer.render(stage);
}

  PIXI.loader
    .add('sprites/Battletoads.png')
    .load(setup);
