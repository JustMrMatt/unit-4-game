$(document).ready(function() {
    var characters = {
        "Deadpool": {
            name: "Deadpool",
            health: 100,
            attack: 14,
            imageUrl: "assets/images/sleepy.jpg",
            enemyAttackBack: 5
        },
        "Wolverine": {
            name: "Wolverine",
            health: 120,
            attack: 8,
            imageUrl: "assets/images/wolverine.jpg",
            enemyAttackBack: 15
        },
        "Colossus": {
            name: "Colossus",
            health: 150,
            attack: 8,
            imageUrl: "assets/images/colossus.jpg",
            enemyAttackBack: 5
        },
        "Juggernaut": {
            name: "Juggernaut",
            health: 180,
            attack: 7,
            imageUrl: "assets/images/juggernaut.jpg",
            enemyAttackBack: 25
        }
    };

    var currCharacterSelected
    var combatants = [];
    var currDefender;
    var turnCounter = 1;
    var killCount = 0;

    var renderOne = function(character, renderArea, charStatus) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);

        if (charStatus === "enemy") {
            $(charDiv).addClass("enemy");
        }
        else if (charStatus === "defender") {
            currDefender = character;
            $(charDiv).addClass("target-enemy");
        }
    };

    var renderMessage = function(message) {
        var gameMessageSet = $("#game-message");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);

        if (message === "clearMessage") {
            gameMessageSet.text("");
        }
    };

    var renderCharacters = function(charObj, areaRender) {
        if (areaRender === "#character-section") {
            $(areaRender).empty();
            for(var key in charObj) {
                if(charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender, "");
                }
            }
        }

        if (areaRender === "#selected-character") {
            renderOne(charObj, areaRender, "");
        }

        if (areaRender === "#available-to-attack-section") {
            for (var i = 0; i < charObj.length; i++) {
                renderOne(charObj[i], areaRender, "enemy");
            }

            $(document).on("click", ".enemy", function() {
                var name = ($(this).attr("data-name"));

                if ($("#defender").children().length === 0) {
                    renderCharacters(name, "#defender");
                    $(this).hide();
                    renderMessage("clearMessage");
                }
            });
        }

        if (areaRender === "#defender") {
            $(areaRender).empty();
            for (var i = 0; i < combatants.length; i++) {
                if (combatants[i].name === charObj) {
                    renderOne(combatants[i], areaRender, "defender");
                }
            }
        }

        if (areaRender === "playerDamage") {
            $("#defender").empty();
            renderOne(charObj, "#defender", "defender");
        }

        if (areaRender === "enemyDamage") {
            $("#selected-character").empty();
            renderOne(charObj, "#selected-character", "");
        }

        if (areaRender === "enemyDefeated") {
            $("#defender").empty();
            var gameStateMessage = "You have defeated " + charObj.name + ", you can choose to fight another Champion!"
            renderMessage(gameStateMessage);
        }
    };

    var restartGame = function(inputEndGame) {
        var restart = $("<center><button>Restart</button></center>").click(function() {
            location.reload();
        });

        var gameState = $("<div>").text(inputEndGame);

        $("body").append(gameState);
        $("body").append(restart);
    };

    renderCharacters(characters, "#character-section");

    $(document).on("click", ".character", function() {
        var name = $(this).attr("data-name");
        if (!currCharacterSelected) {
            currCharacterSelected = characters[name];
            for (var key in characters) {
                if (key !== name) {
                    combatants.push(characters[key]);
                }
            }

            $("#character-section").hide();

            renderCharacters(currCharacterSelected, "#selected-character");
            renderCharacters(combatants, "#available-to-attack-section");
        }
    })

    $("#attack-button").on("click", function() {
        if ($("#defender").children().length !== 0) {
            var attackMessage = "You attacked " + currDefender.name + " for " + (currCharacterSelected.attack * turnCounter) + " damage.";
            var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage.";
            renderMessage("clearMessage");
            currDefender.health -= (currCharacterSelected.attack * turnCounter);
            if (currDefender.health > 0) {
                renderCharacters(currDefender, "playerDamage");
                renderMessage(attackMessage);
                renderMessage(counterAttackMessage);
                currCharacterSelected.health -= currDefender.enemyAttackBack;
                renderCharacters(currCharacterSelected, "enemyDamage");

                if (currCharacterSelected.health <= 0) {
                    renderMessage("clearMessage");
                    restartGame("You have been Defeated!");
                    $("#attack-button").unbind("click");
                }
            }
            else {
                renderCharacters(currDefender, "enemyDefeated");
                killCount++;
                if (killCount >=3) {
                    renderMessage("clearMessage");
                    restartGame();
                    alert("You Won!!! You Are Champion of the Arena!");
                }
            }
        }
        turnCounter++;
    })
});