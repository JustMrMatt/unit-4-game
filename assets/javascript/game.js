$(document).ready(function() {
    var characters = {
        "Deadpool": {
            name: "Deadpool",
            health: 120,
            attack: 8,
            imageUrl: "assets/images/sleepy.jpg",
            enemyAttackBack: 15
        },
        "Wolverine": {
            name: "Wolverine",
            health: 100,
            attack: 14,
            imageUrl: "assets/images/wolverine.jpg",
            enemyAttackBack: 5
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
    }

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
});