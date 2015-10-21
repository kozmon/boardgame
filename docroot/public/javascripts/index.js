$(document).ready(function() {
    initCards();
    initBoard();
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var board = {
    width: 8,
    height: 9
};

var groundFile = {
    width: 6,
    height: 9
};

var buildingFile = {
    width: 4,
    height: 8
};

var cardTypes = {};

var buildingTypes = {};
    
var cards = [0];
var buildings = [0];

//var cellSize = $('.board').width() / board.width;
var cardSize = 80;
    
var zindex = 1;

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function initBoard() {
    for (var i=0;i<board.height;i++) {
        var row = $('<tr></tr>').appendTo($('table.board'));
        for (var j=0;j<board.width;j++) {
            var cell = $('<td></td>').appendTo(row).css({
                'width': cardSize + 'px',
                'height': cardSize + 'px'
            });
            $(cell).droppable({
                accept: ".card, .building",
                activeClass: "ui-state-highlight",
                drop: function( event, ui ) {
                    // clone item to retain in original "list"
                    var item = ui.draggable.clone();
                    $(this).addClass('has-drop').html(item);
                }
            });
        }
    }    
}

function initCards() {
    var ctn = 0;
    cardTypes[0] = {
        'name': 0,
        phases: {
        }
    };
    for (var i=0;i<groundFile.width;i++) {
        for (var j=0;j<groundFile.height;j++) {
            cardTypes[0].phases[ctn] = {
                'imgShiftX': i*(-80),
                'imgShiftY': j*(-80)
            };
            ctn++;
        }
    }

    ctn = 0;
    buildingTypes[0] = {
        'name': 0,
        phases: {
        }
    };
    for (var i=0;i<buildingFile.width;i++) {
        for (var j=0;j<buildingFile.height;j++) {
            buildingTypes[0].phases[ctn] = {
                'imgShiftX': i*(-80),
                'imgShiftY': j*(-80)
            };
            ctn++;
        }
    }

    $('.stack-container .stack').each(function() {
        var stack = this;

        $(cards).each(function() {
            var card = this;
            var rotationCount = Object.keys(cardTypes[card].phases).length;
            
            $(stack).find('.cards')
                .append($('<div class="card" data-rotation="0">' + cardTypes[card].name + '</div>')
                    .draggable({
                        snap: $('table.board').find('td'),
                        snapMode: "inner",
                        snapTolerance: '20',
                        drag: function( event, ui ) {
                            $(this).css({ 'z-index': zindex++ });
                        },
                        helper: "clone",
                        cursor: "move",
                        revertDuration: 0
                    })
                    .css({
                        'width': cardSize + 'px',
                        'height': cardSize + 'px',
                        'background-position-x': cardTypes[card].phases[0].imgShiftX + 'px',
                        'background-position-y': cardTypes[card].phases[0].imgShiftY + 'px',
                        'z-index': zindex++
                    })
                    .click(function(e) {
                        var rotation = parseInt($(this).attr('data-rotation'));
                        $(this).attr('data-rotation', (rotation < rotationCount - 1) ? rotation + 1 : 0);
                        $(this).css({
                            'background-position-x':  cardTypes[card].phases[rotation].imgShiftX + 'px',
                            'background-position-y':  cardTypes[card].phases[rotation].imgShiftY + 'px',
                            'z-index': zindex++
                        });
                    })
                )
            ;
        });
        
        $(buildings).each(function() {
            var building = this;
            var rotationCount = Object.keys(buildingTypes[building].phases).length;
            
            $(stack).find('.buildings')
                .append($('<div class="building" data-rotation="0">' + buildingTypes[building].name + '</div>')
                    .draggable({
                        snap: $('table.board').find('td'),
                        snapMode: "inner",
                        snapTolerance: '20',
                        drag: function( event, ui ) {
                            $(this).css({ 'z-index': zindex++ });
                        },
                        helper: "clone",
                        cursor: "move",
                        revertDuration: 0
                    })
                    .css({
                        'width': cardSize + 'px',
                        'height': cardSize + 'px',
                        'background-position-x': buildingTypes[building].phases[0].imgShiftX + 'px',
                        'background-position-y': buildingTypes[building].phases[0].imgShiftY + 'px',
                        'z-index': zindex++
                    })
                    .click(function(e) {
                        var rotation = parseInt($(this).attr('data-rotation'));
                        $(this).attr('data-rotation', (rotation < rotationCount - 1) ? rotation + 1 : 0);
                        $(this).css({
                        'background-position-x': buildingTypes[building].phases[rotation].imgShiftX + 'px',
                        'background-position-y': buildingTypes[building].phases[rotation].imgShiftY + 'px',
                            'z-index': zindex++
                        });
                    })
                )
            ;
        });
        
    });
}
