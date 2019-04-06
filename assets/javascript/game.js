$(document).ready(function() {
    var characters = {
        "Deadpool": {
            name: "Deadpool",
            health: 120,
            attack: 8,
            imageUrl: "assets/images/wizard.jpg",
            enemyAttackBack: 15
        },
        "Cable": {
            name: "Cable",
            health: 100,
            attack: 14,
            imageUrl: "assets/images/cable.jpg",
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
    console.log(characters);

var renderOne = function(character, renderArea) {
    var charDiv = $("div class='character' data-name='" + character.name + " '>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
}

    var renderCharacters = function(charObj, areaRender) {
        if (areaRender === "#characters-section") {
            $(areaRender).empty();
            for(var key in charObj) {
                if(charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender);
                }
            }
        }
    }
});