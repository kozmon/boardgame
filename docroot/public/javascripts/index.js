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
    },
    5: { 
        name: '5',
        phases: {
            0: {
                imgShiftX: 0,
                imgShiftY: -320
            },
            1: {
                imgShiftX: -160,
                imgShiftY: -400
            }
        }
    },
    6: { 
        name: '6',
        phases: {
            0: {
                imgShiftX: -80,
                imgShiftY: -320
            }
        }
    },
    7: { 
        name: '7',
        phases: {
            0: {
                imgShiftX: -160,
                imgShiftY: -320
            }
        }
    },
    8: { 
        name: '8',
        phases: {
            0: {
                imgShiftX: 0,
                imgShiftY: -400
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
    
var cards = [0,1,2,3,4,5,6,7,8];
var buildings = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];

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
                        }
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
                        snapMode: "outer",
                        snapTolerance: '10',
                        drag: function( event, ui ) {
                            $(this).css({ 'z-index': zindex++ });
                        }
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
