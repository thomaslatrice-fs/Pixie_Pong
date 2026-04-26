//IIFE to protect code
() => {
  //creates the Pixiijs application
  const app = new devicePixelRatio.Application({
    width: 700,
    height: 500,
    backgroundColor: 0x1e90ff,
  });
  //adds game canvas to page
  document.querySelector("#game-container").appendChild(app.view);
  const borderSize = 20; //border thickness
  const circleRadius = 25; //circle size
  let speedX = 4; //left to right speed
  let speedY = 3; //up and down speed
  let gameIsFinished = false; //keeps game from ending more than once

  const borderHit = {
    //stores borders that have been hit
    //starts each border with no hits
    top: false,
    right: false,
    bottom: false,
    left: false,
  };

  //creates top border
  const topBorder = new PIXI.Graphics();
  topBorder.beginFill(0xff0000); //give border red color
  topBorder.drawRect(0, 0, app.screen.width, borderSize); //draws top border
  topBorder.endFill(); //ends fill color
  app.stage.addChild(topBorder);

  const rightBorder = new PIXI.Graphics();
  rightBorder.beginFill(0x00ff00); //give border green color
  rightBorder.drawRect(
    app.screen.width - borderSize,
    0,
    borderSize,
    app.screen.height,
  ); //draws right border
  rightBorder.endFill(); //ends fill color
  app.stage.addChild(rightBorder);

  const bottomBorder = new PIXI.Graphics();
  bottomBorder.beginFill(0xffff00); //give border yellow color
  bottomBorder.drawRect(0, 0, app.screen.width, borderSize); //draws bottom border
  bottomBorder.endFill(); //ends fill color
  app.stage.addChild(bottomBorder);

  const leftBorder = new PIXI.Graphics();
  leftBorder.beginFill(0xff00ff); //give border purple color
  leftBorder.drawRect(0, 0, app.screen.width, borderSize); //draws left border
  leftBorder.endFill(); //ends fill color
  app.stage.addChild(leftBorder);

  const circle = new PIXI.Graphics(); //creates circle
  circle.beginFill(0xffffff);
  circle.drawCircle(0, 0, circleRadius); //draws circle
  circle.endFill();
  circle.x = app.screen.width / 2; //places circle in center horizontally
  circle.y = app.screen.height / 2; //places cirlcle in center vertically
  app.stage.addChild(circle); //adds circle to screen

  //function to change border color
  const changeBorderColor = (border) => {
    return (border.tint = 0x000000); //changes color after border is hit
  };

  const allBordersHit = () => {
    //creates function the check all borders
    return;
    bordersHit.top && bordersHit.right && bordersHit.bottom && bordersHit.left;
  };
};
