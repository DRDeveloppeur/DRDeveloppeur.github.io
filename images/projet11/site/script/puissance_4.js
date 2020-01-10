$.fn.puissance = function(nb_y, nb_x, pone, ptwo, color_one, color_two) {
    var statusPlugin = true;
    var current = null;
    var status = true;
    var text = "A vous ";
    var scoreOne = 0;
    var scoreTwo = 0;
    var currentPlayer = pone;
    var nbToken = nb_y * nb_x;
    var vs;
    var verti;


    function form(){
      $("body").append('<div class="form">' +
      '<p><input type="text" id="pone" value="Player one">' +
      '<input type="text" id="ptwo" value="Player two"></p>' +
      '<input type="radio" name="playerOrAi" id="1" value="1" checked>' +
      '<label for="1">1VS1</label>' +
      '<input type="radio" name="playerOrAi" id="0" value="0">' +
      '<label for="0">AI</label>' +
      '<select id="colorOne" name="color_one" required>' +
        '<option value="red">Rouge</option>' +
        '<option value="blue">Bleu</option>' +
        '<option value="green">Vert</option>' +
        '<option value="black">Noir</option>' +
        '<option value="Darkgray">Gris</option>' +
        '<option value="yellow">Jaune</option>' +
        '<option value="brown">Maron</option>' +
        '<option value="pink">Rose</option>' +
      '</select>' +
      '<select id="colorTwo" name="color_two" required>' +
        '<option value="blue">Bleu</option>' +
        '<option value="red">Rouge</option>' +
        '<option value="green">Vert</option>' +
        '<option value="black">Noir</option>' +
        '<option value="Darkgray">Gris</option>' +
        '<option value="yellow">Jaune</option>' +
        '<option value="brown">Maron</option>' +
        '<option value="pink">Rose</option>' +
      '</select>' +
      '<select id="grid" required>' +
        '<option value="4">4X4</option>' +
        '<option value="5">5X5</option>' +
        '<option value="6">6X6</option>' +
        '<option value="7">7X7</option>' +
        '<option value="8">8X8</option>' +
        '<option value="9">9X9</option>' +
        '<option value="10">10X10</option>' +
      '</select>' +
      '<select id="max" required>' +
        '<option value="3">MAX 3</option>' +
        '<option value="5">MAX 5</option>' +
        '<option value="7">MAX 7</option>' +
        '<option value="10">MAX 10</option>' +
      '</select>' +
      '<button class="ok">OK</button></div>');
    }
    form();
    $("#colorOne").click(function(){
        $("#colorTwo option[value="+$(this).val()+"]").remove();
    })
    $("#colorTwo").click(function(){
      $("#colorOne option[value="+$(this).val()+"]").remove();
    })
    $("#1").click(function(){
      vs = 1;
      return;
    })
    $('#0').click(function(){
      vs = 0;
      return;
    })

    function acc() {
        $(".ok").click(function(){
          $(document).ready(function () {
            if ($("#pone").val() === "" || $("#ptwo").val() === "") {
              alert("Veuillez choisir un nom !");
              location.reload(true);
            }
          })
          scoreOne = 0;
          scoreTwo = 0;
          nb_y = $("#grid").val();
          nb_x = $("#grid").val();
          color_one = $("#colorOne").val();
          color_two = $("#colorTwo").val();
          nbToken = nb_y * nb_x;
          pone = $("#pone").val().replace(/\s/g,"");
          if (vs === 0) {
            alert("L'IA n'est pas fonctionelle pour le moment !");
            ptwo = "AI";
            location.reload(true);
          }
          else {
            ptwo = $("#ptwo").val().replace(/\s/g,"");
          }
        currentPlayer = pone;
        $("body").append("<section class='score'><p class='" + pone + "'>" +
        pone + "</p><p class='" + ptwo + "'>" + ptwo + "</p></section>");
        $("div").css("background-color", color_one);
        $(".form").hide();
        $("div>p").show();
        $(".pname").show();
        $(".score").show();
        $(".score").before("<table></table>");
        for (var i = 0; i < nb_y; i++) {
          $("table").append("<tr id='" + i + "tr'></tr>");
          for (var j = 0; j < nb_x; j++) {
            var td = $("<td></td>").attr("data-position", i + "-" + j);
            $("#" + i + "tr").append(td);
          }
        }
        $("td").on("click", function() {
          if (statusPlugin) {
            position($(this), nb_y, nb_x);
          }
        });
        $("table").before("<div><p class='pname content'>" + text + currentPlayer + "</p></div>");
        $("div").css("background-color", color_one);
      });
        var replay = $("<button>Recommencer</button>").addClass("replay");
        $("header").prepend(replay);
        var back = $("<button>Retour</button>").addClass("back");
        $("header").append(back);
    }
    acc();
    $(".pname").hide();
    $(".score").hide();

    function replay(){
      if ($('#max').val() == scoreOne || $('#max').val() == scoreTwo) {
        $(".replay").on("click", function(e) {
          statusPlugin = false;
          $("span").fadeOut(400, function() {
            $("span").remove();
          });
          $(".score").remove();
          $("table").remove();
          $(".pname").remove();
          $("div>p").hide();
          $(".form").show();
          $("td").removeClass("active");

          setTimeout(function(){ statusPlugin = true; }, 1000);
        });
      }else {
        $(".replay").on("click", function(e) {
          statusPlugin = false;
          $("span").fadeOut(400, function() {
            $("span").remove();
          });
          $("td").removeClass("active");
          if (!status) {
            var color = (status) ? color_two : color_one;
            $("div").css("background-color", color);
            currentPlayer = (status) ? ptwo : pone;
            $(".pname").text(text + currentPlayer);
            status = !status;
          }

          setTimeout(function(){ statusPlugin = true; }, 1000);
        });
      }
    }
    replay();

    // (7 puissance 3) (1, 1, 1) ... (2, 1, 1) ...(7, 7, 7). if grid is 7X7 !

    $(".back").on("click", function(e) {
        if($(current).parent().length === 0) {
            return;
        }
        if (statusPlugin) {
        $(current).parent().removeClass();
        $(current).remove();
        var color = (status) ? color_two : color_one;
        $("div").css("background-color", color);
        currentPlayer = (status) ? ptwo : pone;
        $(".pname").text(text + currentPlayer);
        status = !status;
        }
    });

    $("td").on("click", function() {
        if (statusPlugin) {
            position($(this), nb_y, nb_x);
        }
    });

    function position(that, nb_y, nb_x) {
        var index = that.data("position").split("-");
        var posy = index[0];
        var posx = index[1];
        for (var countY = nb_y; countY >= 0; countY--) {
            current =  $("[data-position='"+ (countY - 1) +"-"+ posx +"']");
            var currentclass = current.attr("class");
            if(currentclass !== "active") {
                var color = (status) ? color_one : color_two;
                var tokensize = $(".token").length;
                if (countY === 0) { return; }
                current.addClass("active").append("<span class='token'></span>");
                current.find("span").animate({marginTop: 0},"slow").css("background-color", color);
                status = !status;
                $("div").css("background-color", color = (status) ? color_one : color_two);
                currentPlayer = (status) ? pone : ptwo;
                $(".pname").text(text + currentPlayer);
                status = !status;
                algo(nb_y ,nb_x ,countY, posx, posy);
                status = !status;
                if (nbToken === (tokensize + 1)) {
                    alert("Match NULL");
                    statusPlugin = !statusPlugin;
                    return;
                }
                return;
            }
        }
    }

    function algo(nb_y, nb_x, countY, posx, posy) {
        vertical(nb_y , countY, posx);
        horizontal(nb_y ,nb_x , countY, posx, posy);
        diagoleft(nb_y ,countY , posx);
        diagoright(nb_y ,countY , posx);
    }

    function vertical(nb_y, y, posx) {
        var verti = 0;
        y--;
        var rgb = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var countY = y; countY < nb_y; countY++) {
            var morergb = $("[data-position='"+ countY +"-"+ posx +"']").find("span").css("background-color");
            if (rgb === morergb) {
                verti++;
                if (verti === 4) {
                    statusPlugin = !statusPlugin;
                    winer();
                    return;
                }
            }
            else {
                return;
            }
        }
    }

    function com(){
      if (vs === 0) {
        if (verti === 3) {
          if (status) {
            status = !status;
            if (statusPlugin) {
              var pos = $("[data-position='"+ countY +"-"+ posx +"']");
              position(pos, nb_y, nb_x);
            }
            status = !status;
          }
        }
        else if (verti === 0) {
          if (status) {
            status = !status;
            if (statusPlugin) {
              var chx = 0 + Math.floor(Math.random() * (nb_x-1));
              var pos = $("[data-position='"+ countY +"-"+ chx +"']");
              position(pos, nb_y, nb_x);
            }
            status = !status;
          }
        }
      }
    }

    function horizontal(nb_y, nb_x, y, posx, posy) {
        var hori = 0;
        y--;
        nb_x = (nb_x -1);
        var rgbh = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var countX = posx; countX <= nb_x; countX++) {
            var morergbh = $("[data-position='"+ y +"-"+ countX +"']").find("span").css("background-color");
            if (rgbh === morergbh) {
                hori++;
                current = $("[data-position='"+ y +"-"+ countX +"']").find("span")[0];
                if (hori === 4) {
                    statusPlugin = !statusPlugin;
                    winer();
                    return;
                }
                else {
                    horileft(countX, y);
                }
            }
            else {
                return;
            }
        }
    }

    function horileft(x, y) {
        var horileft = 0;
        var morergbh = $("[data-position='"+ y +"-"+ x + "']").find("span").css("background-color");
        for (var countX = x; countX >= 0; countX--) {
            var currentrgb = $("[data-position='"+ y +"-"+ countX +"']").find("span").css("background-color");
            if (currentrgb === morergbh) {
                horileft++;
                if (horileft === 4) {
                    statusPlugin = !statusPlugin;
                    winer();
                    return;
                }
            }
            else {
                horileft = 0;
                return;
            }
        }
    }

    function diagoleft(nb_y, y, posx) {
        y--;
        var diagoleft = 0;
        var morergbh = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var countY = posx; countY <= nb_y; countY++) {
            var currentrgb = $("[data-position='"+ y + "-"+ countY +"']").find("span").css("background-color");
            if (currentrgb === morergbh) {
                diagoleft++;
                if (diagoleft >= 4) {
                    statusPlugin = !statusPlugin;
                    winer();
                    return;
                }
                else {
                    leftBottom(y, countY);
                }
            }
            else {
                return;
            }
            y--;
        }
    }

    function leftBottom(x, y) {
        var morergb = $("[data-position='"+ x + "-"+ y +"']").find("span").css("background-color");
        var diagoBF = 0;
        for(var countY = y; countY >= 0; countY--) {
            var rgbpos = $("[data-position='"+ x + "-"+ countY +"']").find("span").css("background-color");
            if (rgbpos === morergb) {
                diagoBF++;
                if (diagoBF >= 4) {
                    statusPlugin = !statusPlugin;
                    winer();
                    return true;
                }
            }
            else {
                return;
            }
            x++;
        }
    }

    function diagoright(nb_y, y, posx) {
        y--;
        var countDR = 0;
        var morergbh = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var k = posx; k <= nb_y; k++) {
            var currentrgb = $("[data-position='"+ y + "-"+ k +"']").find("span").css("background-color");
            if (currentrgb === morergbh) {
                countDR++;
                if (countDR >= 4) {
                    statusPlugin = !statusPlugin;
                    winer();
                    return;
                }
                else {
                    rightBottom(y, k);
                }
            }
            else {
                return;
            }
            y++;
        }
    }

    function rightBottom(x, y) {
        var morergb = $("[data-position='"+ x + "-"+ y +"']").find("span").css("background-color");
        var diagoBF = 0;
        for(var countY = y; countY >= 0; countY--) {
            var rgbpos = $("[data-position='"+ x + "-"+ countY +"']").find("span").css("background-color");
            if (rgbpos === morergb) {
                diagoBF++;
                if (diagoBF >= 4) {
                    statusPlugin = !statusPlugin;
                    winer();
                    return true;
                }
            }
            else {
                return -1;
            }
            x--;
        }
    }


    function winer() {
        currentPlayer = (status) ? pone : ptwo;
        var gif = "<img src='https://www.gardner-white.com/images/content/90674.gif' width='500px' alt='gif'>";
        if (currentPlayer === pone) {
            scoreOne++;
            $("." + currentPlayer).html(currentPlayer + " : " + scoreOne);
            if ($('#max').val() == scoreOne) {
              $("body").prepend("<section class='alert'><p>" + currentPlayer +  " Gagne la partie !!!<br>" + gif + "</p></section>");
            }
            else {
              $("body").prepend("<section class='alert'><p>" + currentPlayer +  " A gagner " + scoreOne + " partie</p></section>");
            }
            replay();
        }
        if (currentPlayer === ptwo) {
            scoreTwo++;
            $("." + currentPlayer).html(currentPlayer + " : " + scoreTwo);
            if ($('#max').val() == scoreTwo) {
              $("body").prepend("<section class='alert'><p>" + currentPlayer +  " Gagne la partie !!!<br>" + gif + "</p></section>");
            }
            else {
              $("body").prepend("<section class='alert'><p>" + currentPlayer +  " A gagner " + scoreTwo + " partie</p></section>");
            }
            replay();
        }

        function remove() {
            $(".alert").remove();
        }setTimeout(remove, 3000);
    }
};

$(function() {
  $("winerdow").puissance($("#grid").val(), $("#grid").val(), $("#pone").val(), $("#two").val(), $("#colorOne").val(), $("#colorTwo").val());
});
