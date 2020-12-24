var trex,
    trex_running,
    trex_collided,
    JumpSound,
    dieSound,
    checkPointSound;


var ground,
    invisibleGround,
    groundImage,
    restart,
    restart1;


var cloudImage,
    cloudsGroup,
    ObstaclesGroup,
    obstacle1,
    obstacle2,
    obstacle3,
    obstacle4,
    obstacle5,
    obstacle6,
    gameover,
    gameover1;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;


function preload()
 {
         trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
         trex_collided = loadImage("trex_collided.png");
  
         groundImage = loadImage("ground2.png");
     
         cloudImage = loadImage("cloud.png");
     
         obstacle1 = loadImage("obstacle1.png");
         obstacle2 = loadImage("obstacle2.png");
         obstacle3 = loadImage("obstacle3.png");
         obstacle4 = loadImage("obstacle4.png");
         obstacle5 = loadImage("obstacle5.png");
         obstacle6 = loadImage("obstacle6.png");
         gameover = loadImage("gameOver.png");
         restart = loadImage("restart.png");
         JumpSound = loadSound("jump.mp3");
         dieSound = loadSound("die.mp3");
         checkPointSound = loadSound("checkPoint.mp3")
        
}

    function setup() 
       {
          background(220);
      
          createCanvas(600,200)
  
          //create a trex sprite
          trex = createSprite(50,160,20,50);
          trex.addAnimation("running", trex_running);
          trex.addAnimation("collided",trex_collided);
          trex.scale = 0.5;
          trex.setCollider("circle",100,0,50);
          trex.debug = false;
          //create a ground sprite
          ground = createSprite(200,180,400,20);
          ground.addImage("ground",groundImage);
          ground.x = ground.width /2;
         
  
          //creating invisible ground
          invisibleGround = createSprite(200,190,400,10);
          invisibleGround.visible = false;
  
          //generate random numbers
          var rand =  Math.round(random(1,100))
          console.log(rand)

           //for new groups
        cloudsGroup = createGroup();

        ObstaclesGroup = new Group();
         
         gameover1 = createSprite(300,100,50,50);
         gameover1.addImage(gameover);
         gameover1.scale = 0.72;
         
         restart1 = createSprite(300,150,25,25);
         restart1.addImage(restart);
         restart1.scale = 0.5;
         
      }

        

function draw() 
      {
          //set background color
          background("black");
          
        
       if(gameState === PLAY)
          {
                score = score+Math.round(frameCount/400);
                 
       if(keyDown("space")&& trex.y >= 100) 
          {
                trex.velocityY = -10;
                JumpSound.play();
          }
                 ground.velocityX = -( 10 + score/100);
                 console.log(ground.velocityX)
            
            if(score>0&& score% 200=== 0)
              {
                checkPointSound.play();
              }
          
                trex.velocityY = trex.velocityY + 0.8
            
        if (ground.x < 0)
         {
                ground.x = ground.width/2;
         }
            gameover1.visible = false;
            restart1.visible = false;
            
              //Spawn Clouds
             spawnClouds();
         
             // Spawn Obstacles
             spawnObstacles();
        
             if(ObstaclesGroup.isTouching(trex))
               {
                 gameState = END;
                 dieSound.play();
                 //trex.velocityY = -10;
                 //JumpSound.play();
                 
               }
                     
            
        }
          
        else if(gameState === END)
                {
                   cloudsGroup.setVelocityXEach (0) ;
                   ObstaclesGroup.setVelocityXEach(0);
                   ground.setVelocity(0,0);
                   ObstaclesGroup.setLifetimeEach(-1);
                   cloudsGroup.setLifetimeEach(-1);
                   gameover1.visible = true;
                   restart1.visible = true;
                   trex.changeAnimation("collided",trex_collided);
                   
                }
        
          //scoreboard
          text("Score : "+ score,100,50);
         
    
  
          // jump when the space key is pressed
          
  
        
        
        
        
  
  
        //for movement of ground
       
  
        
         //stop trex from falling down
        trex.collide(invisibleGround);
  
        if(mousePressedOver(restart1))
          {
            reset();
          }
       drawSprites();
        
    }


        //function to spawn the clouds
      function spawnClouds()
    {
         // write your code here 
          if(frameCount %40 ===  0)
    {
        var cloud = createSprite(600,100,40,10);
        cloud.velocityX = -3;   
        cloud.addImage(cloudImage);
        cloud.scale = 0.5;
        cloud.y = Math.round(random(10,60)); 
    
  // console log
   console.log("trex "+ trex.depth);
   console.log("cloud "+ cloud.depth);
    
  //for not touching of clouds
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1; 
    
    //time = distance/speed
    //time = 600/3
    cloud.lifetime = 200;
      
     cloudsGroup.add(cloud);
      
    }
     
        
    }

      
     function reset()
            {
              gameState = PLAY;
              ObstaclesGroup.destroyEach();
              cloudsGroup.destroyEach();
              trex.changeAnimation("running", trex_running);
              score = 0;
            }

 
      //Spawn Obstacles
      function spawnObstacles ()
        {
          if(frameCount%50 === 0)
        {
            var obstacle = createSprite(600,170,10,10);
            obstacle.scale = 0.5;
            obstacle.setVelocity(-15,0);
            var rand = Math.round(random(1,6));
            obstacle.lifetime = 120;
            switch(rand)
        {
                // for adding up random images
                case 1 : obstacle.addImage(obstacle1);
                break;
            
                case 2 : obstacle.addImage(obstacle2);
                break;
            
                case 3 : obstacle.addImage(obstacle3);
                break;
              
                case 4 : obstacle.addImage(obstacle4);
                break;
            
                case 5 : obstacle.addImage(obstacle5);
                break;
            
                case 6 : obstacle.addImage(obstacle6);
                break;
            
                default:
                break;
    
                
          }
              ObstaclesGroup.add(obstacle);
          }
          }


