//IIFE to protect code
(() => {
  //creates the Pixiijs application
  const app = new PIXI.Application({
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

  const bordersHit = {
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
  //creates right border
  const rightBorder = new PIXI.Graphics();
  rightBorder.beginFill(0x00ff00); //give border green color
  rightBorder.drawRect(
    app.screen.width - borderSize,
    0,
    borderSize,
    app.screen.height,
  );
  //draws right border
  rightBorder.endFill(); //ends fill color
  app.stage.addChild(rightBorder);
  //creates bottom border
  const bottomBorder = new PIXI.Graphics();
  bottomBorder.beginFill(0xffff00); //give border yellow color
  bottomBorder.drawRect(
    0,
    app.screen.height - borderSize,
    app.screen.width,
    borderSize,
  ); //draws bottom border
  bottomBorder.endFill(); //ends fill color
  app.stage.addChild(bottomBorder);

  const leftBorder = new PIXI.Graphics();
  leftBorder.beginFill(0xff00ff); //give border purple color
  leftBorder.drawRect(0, 0, borderSize, app.screen.height); //draws left border
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
    return (
      bordersHit.top && bordersHit.right && bordersHit.bottom && bordersHit.left
    );
  };

  //creates promise for ending the game
  const gamePromise = new Promise((resolve) => {
    app.ticker.add(() => {
      if (gameIsFinished === true) {
        return;
      }

      circle.x += speedX; //moves left of right
      circle.y += speedY; //moves up or down

      if (circle.y - circleRadius <= borderSize) {
        //checks if circle touches the top border
        circle.y = borderSize + circleRadius; //keeps circle from going through border
        speedY *= -1; //reverses vertical direction
        bordersHit.top = true; //remembers border was hit
        changeBorderColor(topBorder); //changes border color
      }

      //checks if circle touches the right border
      if (circle.x + circleRadius >= app.screen.width - borderSize) {
        circle.x = app.screen.width - borderSize - circleRadius;
        //keeps circle from going through border
        speedX *= -1; //reverses the horizontal direction
        bordersHit.right = true; //remembers border was hit
        changeBorderColor(rightBorder); //changes border color
      }
      if (circle.y + circleRadius >= app.screen.height - borderSize) {
        //checks if circle touches the bottom border
        circle.y = app.screen.height - borderSize - circleRadius; //keeps circle from going through border
        speedY *= -1; //reverses the vertical direction
        bordersHit.bottom = true; //remembers border was hit
        changeBorderColor(bottomBorder); //changes border color
      }
      if (circle.x - circleRadius <= borderSize) {
        //checks if circle touches the left border
        circle.x = borderSize + circleRadius; //keeps circle from going through border
        speedX *= -1; //reverses the horizontal direction
        bordersHit.left = true; //remembers border was hit
        changeBorderColor(leftBorder); //changes border color
      }

      if (allBordersHit() === true) {
        gameIsFinished = true;
        resolve();
      }
    });
  });
  gamePromise.then(() => {
    app.ticker.stop();
    alert("Circle has hit all 4 borders. Application is complete");
  });
})();
