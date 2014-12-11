// Strategy definition
var moves = {
  myExpert : function(gameData, helpers) {
    var myHero = gameData.activeHero;

    //console.log("\n\n------In my routine:");

    // all the options to choose from
    // return helpers.findNearestHealthWell(gameData);
    // return helpers.findNearestWeakerEnemy(gameData);
    // return helpers.findNearestEnemy(gameData);
    // return helpers.findNearestTeamMember(gameData);
    // return helpers.findNearestNonTeamDiamondMine(gameData);
    // return helpers.findNearestUnownedDiamondMine(gameData);

    var distanceToHealthWell = 0;
    var directionToHealthWell = 0;
    var distanceToDiamondMine = 0;
    var directionToDiamondMine = 0;
    var distanceToStrongEnemy = 0;
    var directionToStrongEnemy = 0;
    var distanceToWeakEnemy = 0;
    var directionToWeakEnemy = 0;
    //Get stats on the nearest health well
    var myLocalStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
      if (boardTile.type === 'HealthWell') {
         return true;
      }
    });
    distanceToHealthWell = myLocalStats.distance;
    directionToHealthWell = myLocalStats.direction;

    //Get stats on the nearest diamond mine
    var myLocalStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
      if (boardTile.type === 'DiamondMine' && boardTile.team !== myHero.team) {
      //if (boardTile.type === 'DiamondMine') {
         return true;
      }
    });
    if (myLocalStats) {
      distanceToDiamondMine = myLocalStats.distance;
      directionToDiamondMine = myLocalStats.direction;
      }
    else {
      distanceToDiamondMine = 99;
      directionToDiamondMine = 'East';
      }

    //Get stats on the nearest strong hero
    var myLocalStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
      if (boardTile.type === 'Hero' && boardTile.team !== myHero.team && boardTile.health >= myHero.health) {
         return true;
      }
    });
    if (myLocalStats) {
      distanceToStrongEnemy = myLocalStats.distance;
      directionToStrongEnemy = myLocalStats.direction;
      }
    else {
      distanceToStrongEnemy = 99;
      directionToStrongEnemy = 'East';
      }

    //Get stats on the nearest weak hero
    var myLocalStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
      if (boardTile.type === 'Hero' && boardTile.team !== myHero.team && boardTile.health < myHero.health) {
         return true;
      }
    });
    if (myLocalStats) {
      distanceToWeakEnemy = myLocalStats.distance;
      directionToWeakEnemy = myLocalStats.direction;
      }
    else {
      distanceToWeakEnemy = 99;
      directionToWeakEnemy = 'East';
      }

    //Get stats on the nearest team member
    var myLocalStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
      if (boardTile.type === 'Hero' && boardTile.team === myHero.team) {
         return true;
      }
    });
    if (myLocalStats) {
      distanceToTeamMember = myLocalStats.distance;
      directionToTeamMember = myLocalStats.direction;
      }
    else {
      distanceToTeamMember = 99;
      directionToTeamMember = 'East';
      }


    //now that I have stats, go
    //if health is greater than 60, find the nearest stuff and do it
    if (myHero.health >= 80) {
      return helpers.findNearestEnemy(gameData);
      }
    else if (myHero.health >= 60 && myHero.health < 80) {
      if (distanceToWeakEnemy < distanceToDiamondMine) {
         return helpers.findNearestWeakerEnemy(gameData);
         }
      else {
         return helpers.findNearestNonTeamDiamondMine(gameData);
         }
      }
    else if (myHero.health >= 40 && myHero.health < 60) {
      return helpers.findNearestUnownedDiamondMine(gameData);
      }
    else {
      return helpers.findNearestHealthWell(gameData);
      }
    }
 };

//  Set our heros strategy
var move = moves.myExpert;

// Export the move function here
module.exports = move;
