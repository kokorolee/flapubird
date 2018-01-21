$(function() {
  //saving dom obj to variables;
  var container = $('#container');
  var bird = $('#bird');
  var pole = $('.pole');
  var pole_1 = $('#pole_1');
  var pole_2 = $('#pole_2');
  var score = $('#score');
  var speed = $('#speed');
  var restart_btn = $('#restart_btn');

  //some initial variables
  var container_width = parseInt(container.width());
  var container_height = parseInt(container.height());

  var pole_init_position = parseInt(pole.css('right'));
  var pole_init_height = parseInt(pole.css('height'));
  var bird_left = parseInt(bird.css('left'));
  var bird_right = parseInt(bird.css('right'));
  var bird_height = parseInt(bird.height());

  var speed = 10;
  var speed_c = 0;

  var fly_up = false;
  var go_up;
  var the_game = setInterval(function() {
    var bird_top = parseInt(bird.css('top'));
    if (collision(bird, pole_1) || collision(bird, pole_2) || bird_top <= 0 || bird_top >=  bird_top+ container_width ) {
      stop_game();
      restart_btn.slideDown();
      bird.css({
        'display' : 'none'
      });
    } else {
      var pole_current_position = parseInt(pole.css('right'));
      if (pole_current_position > container_width) {
        speed_c += 1;
        //score
        score.text(parseInt(score.text()) + 1);
        //new height
        var new_height = parseInt(getRandomInt(-50, 100));

        pole_1.css('height', pole_init_height + new_height);
        pole_2.css('height', pole_init_height - new_height);
        pole_current_position = pole_init_position;

        //bird bumb~~~! the pole =))
        // increase speed
        if (speed_c >= 3) {
          speed += 1;
          speed_c = 0;
        }

      }
      // fly up
      if (fly_up === false) {
        fly_down();
      }

      pole.css('right', pole_current_position + speed);
      $('#speed').text(speed);

    }

  }, 40);

  $(document).on('keydown', function(e) {
    var key = e.keyCode;
    if (key === 32 && fly_up === false) {
      go_up = setInterval(up, 40);
      fly_up = true;
    }
  });

  $(document).on('keyup', function(e) {
    var key = e.keyCode;
    if (key === 32 && fly_up === true) {
      clearInterval(go_up);
      fly_up = false;
    }
  });
  //fly down
  function fly_down() {
    bird.css('top', parseInt(bird.css('top')) + 10);
  }
  //fly up
  function up() {
    bird.css('top', parseInt(bird.css('top')) - 10);
  }
  //random new height for pole;
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);

    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);

    var b2 = y2 + h2;
    var r2 = x2 + w2;

    //con chim cham dat hoac bay len troi
    // if (b1 < y2 || b2 < y1) return false;

    //con chim dung vat cang
    if (r1 < x2 || r2 < x1 || b1 < y2 || b2 < y1)
      return false;
    return true;
  }

  function stop_game() {
    clearInterval(the_game);
  }

  $('#restart_btn').on('click', function(){
    location.reload();
  })
});
