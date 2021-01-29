let gradientGreenBlue = "linear-gradient(to left bottom, #5590e9, #004d7a, #008793, #00bf72,#a8eb12";
let gradientBluePink = "linear-gradient(to right, #33ccff 0%, #ff99cc 100%)";
let gradientYellowGreen = "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)";
let defaultBarColor = "#6699CC"
let data1 = [
  ['Apples', 11],
  ['Oranges', 24],
  ['Pears', 18]
];
$(function () {
  $("#chart-title").on("input", function () {
    // Print entered value in a div box

    if ($(this).val().trim().length === 0) {
      $("h1").text('Enter a name for Bar Chart');

    } else {
      $("h1").text($(this).val());
    }
  });
});


$(document).ready(function () {
  const chart1 = $("#chartContainer")
  $(document).ready(function () {
    const data1 = [];
    let counter = 0;

    $('#addBar').click(function () {
      if (isNaN(Number($("#value" + counter).val())) === true) {
        alert("Please Enter a number for value")
        console.log(counter);
      } else {
        data1.push([$("#item" + counter).val(), Number($("#value" + counter).val())])
        $("table").append('<tr><td><input type=text class="label-input" id=item' + (counter + 1) + ' ' + 'value=" " /></td> <td><input type=text class="label-input" id=value' + (counter + 1) + ' ' + 'value=" " /></td></tr>');
        counter++;
        console.log(counter);
        $(".chart-container").empty();
        createBarChart(data1, chart1, options1)
      }
    })
    $('#delete').click(function () {
      if (counter === 0) {
        alert("Gotta Enter a value!")
      } else {
        data1.pop();
        console.log(counter);
        $(".chart-container").empty();
        createBarChart(data1, chart1, options1)
        if (counter > -1) {
          $("#item" + (counter)).remove();
          $("#value" + (counter)).remove();
          counter--;
        }
        console.log(counter);
      }
    })

    $('#color1').click(function () {
      options1.barColors = [gradientGreenBlue];
      console.log(options1.barColors)
      $(".chart-container").empty();
      createBarChart(data1, chart1, options1)
    })

    $('#color2').click(function () {
      options1.barColors = [gradientBluePink];
      console.log(options1.barColors)
      $(".chart-container").empty();
      createBarChart(data1, chart1, options1)
    })

    $('#color3').click(function () {
      options1.barColors = [gradientYellowGreen];
      $(".chart-container").empty();
      createBarChart(data1, chart1, options1)
    })
    // bar customization
    $(document).ready(function () {
      $(document).on('click', '#bar', function () {
        $(".colorPicker").colorPick({
          'onColorSelected': function () {
            this.element.css({ 'backgroundColor': this.color, 'color': this.color });
            console.log($(this).val())
            options1.barColors = [this.color];
            createBarChart(data1, chart1, options1)
          }
        });
        $("#SizeSlider").attr({ "min": 0.3, "max": 0.9, "step": 0.1 });
        $("#SizeSlider").on('input', function () {
          options1.barSpacing = $(this).val()
          createBarChart(data1, chart1, options1)
        })
      });
    })
    //width customization
    $(document).on('click', '#width', function () {
      $("#SizeSlider").attr({ "min": 321, "max": 641 });


    });




    $(document).on('click', '#title', function () {
      $(".colorPicker").colorPick({
        'onColorSelected': function () {
          this.element.css({ 'backgroundColor': this.color, 'color': this.color });
          $('h1').css('color', this.color)
        }
      });
      $("#SizeSlider").attr({ "min": 8, "max": 20 })
      $("#SizeSlider").on("input", function () {
        $("h1").css("font-size", $(this).val() + "px")
      })
    });

    const options1 = {
      width: 320,
      height: 320,
      barSpacing: 0.6,
      barColors: [defaultBarColor],
    }
  })

  $(".colorPicker").colorPick({ 'initialColor': '#2C3E50' });

  $("#SizeSlider").hide();
  $("#SliderButton").click(function () {
    $("#SizeSlider").toggle(80);
  });


  $(document).ready(function () {
    $("#tabs-1").show();

    $('#tabs-nav li').click(function () {
      $(this).addClass("hide")
      $('.tab-content').hide();
      $('#tabs-nav li').removeClass('active');
      $(this).addClass('active');
      var activeTab = $(this).find('a').attr('href');
      $(activeTab).stop().fadeIn(200);
      return false;
    });
  })

  $('ul li a').on('click', function (e) {
    e.preventDefault();
    $('ul li').removeClass('current');
    $(this).parent('li').addClass('current');
  })



  $('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
  });
  $('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
  });
  $('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
  });
})





