$(document).ready(function() {
    initCards();
    initBoard();
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var board = {
    width: 8,
    height: 9
};

var cardTypes = {
    0: { 
        name: '0',
        phases: {
            0: {
                imgShiftX: -240,  
                imgShiftY: -240
            }
        }
    },
    1: { 
        name: '1',
        phases: {
            0: {
                imgShiftX: -240,  
                imgShiftY: -160
            },
            1: {
                imgShiftX: 0,
                imgShiftY: -240
            },
            2: {
                imgShiftX: -80,  
                imgShiftY: -240
            },
            3: {
                imgShiftX: -160,  
                imgShiftY: -240
            }
        }
    },
    2: { 
        name: '2',
        phases: {
            0: {
                imgShiftX: 0,
                imgShiftY: -160
            },
            1: {
                imgShiftX: -80,
                imgShiftY: -160
            },
            2: {
                imgShiftX: -80,
                imgShiftY: -80
            },
            3: {
                imgShiftX: -160,  
                imgShiftY: -80
            },
            4: {
                imgShiftX: -160,  
                imgShiftY: -160
            },
            5: {
                imgShiftX: -240,  
                imgShiftY: -80
            }
        }
    },
    3: { 
        name: '3',
        phases: {
            0: {
                imgShiftX: -80,
                imgShiftY: 0
            },
            1: {
                imgShiftX: -160,
                imgShiftY: 0
            },
            2: {
                imgShiftX: -240,
                imgShiftY: -0
            },
            3: {
                imgShiftX: 0,  
                imgShiftY: -80
            }
        }
    },
    4: { 
        name: '4',
        phases: {
            0: {
                imgShiftX: 0,
                imgShiftY: 0
            }
        }
    }
};
    
var buildingTypes = {
    0: { 
        name: '0',
        phases: {
            0: {
                imgShiftX: -240,  
                imgShiftY: -240
            }
        }
    },
    1: { 
        name: '1',
        phases: {
            0: {
                imgShiftX: -240,  
                imgShiftY: -160
            },
            1: {
                imgShiftX: 0,
                imgShiftY: -240
            },
            2: {
                imgShiftX: -80,  
                imgShiftY: -240
            },
            3: {
                imgShiftX: -160,  
                imgShiftY: -240
            }
        }
    },
    2: { 
        name: '2',
        phases: {
            0: {
                imgShiftX: 0,
                imgShiftY: -160
            },
            1: {
                imgShiftX: -80,
                imgShiftY: -160
            },
            2: {
                imgShiftX: -80,
                imgShiftY: -80
            },
            3: {
                imgShiftX: -160,  
                imgShiftY: -80
            },
            4: {
                imgShiftX: -160,  
                imgShiftY: -160
            },
            5: {
                imgShiftX: -240,  
                imgShiftY: -80
            }
        }
    },
    3: { 
        name: '3',
        phases: {
            0: {
                imgShiftX: -80,
                imgShiftY: 0
            },
            1: {
                imgShiftX: -160,
                imgShiftY: 0
            },
            2: {
                imgShiftX: -240,
                imgShiftY: -0
            },
            3: {
                imgShiftX: 0,  
                imgShiftY: -80
            }
        }
    },
    4: { 
        name: '4',
        phases: {
            0: {
                imgShiftX: 0,
                imgShiftY: 0
            }
        }
    }
};
    
var cards = [0,1,2,3,4,0,1,2,3,4,1,2,3,4];
var buildings = [0,1,2,3,4,0,1,2,3,4];

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
        }
    }
}

function initCards() {
    $('.stack-container .stack').each(function() {
        for (var i=0;i<cards.length;i++) {
            $(this).find('.cards')
                .append($('<div class="card" data-rotation="0">' + cardTypes[cards[i]].name + '</div>')
                    .draggable({
                        snap: $('table.board').find('td'),
                        snapMode: "outer",
                        snapTolerance: '5',
                        drag: function( event, ui ) {
                            $(this).css({ 'z-index': zindex++ });
                        }
                    })
                    .css({
                        'width': cardSize + 'px',
                        'height': cardSize + 'px',
                        'background-position-x':  cardTypes[cards[i]].phases[0].imgShiftX + 'px',
                        'background-position-y':  cardTypes[cards[i]].phases[0].imgShiftY + 'px',
                        'z-index': zindex++
                    })
                    .click(function(e) {
                        var rotation = parseInt($(this).attr('data-rotation'));
                        $(this).attr('data-rotation', (rotation < 3) ? rotation + 1 : 0);
                        $(this).css({
                            'background-position-x':  cardTypes[cards[i]].phases[rotation].imgShiftX + 'px',
                            'background-position-y':  cardTypes[cards[i]].phases[rotation].imgShiftY + 'px',
                            'z-index': zindex++
                        });
                    })
                )
            ;
        }
        
        for (var i=0;i<buildings.length;i++) {
            $(this).find('.buildings')
                .append($('<div class="building">' + buildingTypes[buildings[i]].name + '</div>')
                    .draggable({
                        snap: $('table.board').find('td'),
                        snapMode: "outer",
                        snapTolerance: '5',
                        drag: function( event, ui ) {
                            $(this).css({ 'z-index': zindex++ });
                        }
                    })
                    .css({
                        'width': cardSize + 'px',
                        'height': cardSize + 'px',
                        'background-position-x':  buildingTypes[buildings[i]].phases[0].imgShiftX + 'px',
                        'background-position-y':  buildingTypes[buildings[i]].phases[0].imgShiftY + 'px',
                        'z-index': zindex++
                    })
                )
                .mousedown(function(e) {
                    if (e.which == 3) {
                        var rotation = parseInt($(this).attr('data-rotation')) + 1;
                        $(this).attr('data-rotation', (rotation >= 4) ? rotation : 0);
                        $(this).css({
                            'background-position-x':  cardTypes[cards[i]].phases[rotation].imgShiftX + 'px',
                            'background-position-y':  cardTypes[cards[i]].phases[rotation].imgShiftY + 'px',
                            'z-index': zindex++
                        });
                    }
                })
            ;
        }
    });
}
