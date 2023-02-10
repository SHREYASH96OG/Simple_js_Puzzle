$(function(){
    var empty = new Object();
    var opened = {
        "1" : new Object(),
        "2" : new Object()
    };
    var moves = 0;
    var clicks = 0;
    function unflip(){
    setTimeout(function(){
    var one = $(opened["1"]);
    var two = $(opened["2"]);
    if(one.text() != two.text()){
        one.toggleClass("down");
        two.toggleClass("down");
    }
    else{
        one.off("click");
        two.off("click");
        one.attr("name", true);
        two.attr("name", true);
        one.addClass("disabled");
        two.addClass("disabled");
        var win = false;
        for(var i = 0; i < 16; i++){
            var name = $("td").eq(i).attr("name");
            if(name && name != false){
                win = true;
            }
            else{
                win = false;
                break;
            }
        }
        if(win == true){
            var restart = confirm("You Won!\nMoves: " + moves + "\nPress \"OK\" to start a New Game!");
            if(restart){
                setup(true);
                moves = 0;
            }else{}
        }else{}
    }
        opened = {
        "1" : new Object(),
        "2" : new Object()
    };
        }, 500);
    }
    function clicked(){
    ++clicks;
    ++moves;
    if($(this).hasClass("click")){
        $(this).removeClass("click");
        $(this).addClass("down");
        opened["1"] = new Object();
        clicks = 0;
    }
    else{
        $(this).addClass("click");
        if(clicks >= 2){
            opened["2"] = $(this);
            unflip();
            clicks = 0;
            $("td").removeClass("click")
        }
        else{
            opened["1"] = $(this)
        }
        $(this).toggleClass("down");
    }
    }
    $("td").on("click", clicked);
    function setup(retry){
    if(retry){
        $("td").on("click", clicked);
        $("td").toggleClass("down");
    }
        var used = {
            "0" : false,
            "1" : false,
            "2" : false,
            "3" : false,
            "4" : false,
            "5" : false,
            "6" : false,
            "7" : false,
            "8" : false,
            "9" : false,
            "10" : false,
            "11" : false,
            "12" : false,
            "13" : false,
            "14" : false,
            "15" : false
        }
        function random(){
            var rand = (Math.floor(Math.random() * 16));
            while(used[rand] == true){
                rand = (Math.floor(Math.random() * 16));
            }
            used[rand] = true;
            return rand;
        }
        var icons = [
            "♣",
            "♠",
            "♪",
            "♥",
            "♦",
            "★",
            "◼",
            "☀"
        ];
        for(i in icons){
            var ico = icons[i];
            var one = $("td").eq(random());
            var two = $("td").eq(random());
            $(one).text(ico);
            $(two).text(ico);
        }
        $("td").removeAttr("name");
        $("td").removeClass("disabled");
    }
    setup();
});
