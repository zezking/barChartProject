let gradientGreenBlue = "linear-gradient(to left bottom, #5590e9, #004d7a, #008793, #00bf72,#a8eb12";
let gradientBluePink = "linear-gradient(to right, #33ccff 0%, #ff99cc 100%)";
let gradientYellowGreen = "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)";
let defaultBarColor = "#6699CC"


$(function () {
  $("#tabs").tabs();
});

$(function () {
  $("#slider").slider();
});

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

$("#fontSlider").click(function () {
  $("#fontSize").toggle("slow");
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
      console.log(options1.barColors)
      $(".chart-container").empty();
      createBarChart(data1, chart1, options1)
    })
  })

  $(".colorPicker").colorPick({ 'initialColor': '#2C3E50' });
  $(".colorPicker").colorPick({
    'onColorSelected': function () {
      console.log(this.color)
      this.element.css({ 'backgroundColor': this.color, 'color': this.color });
      $('h1').css('color', this.color)
    }

  });
  $("#fontSizeSlider").hide();
  $("#fontSliderButton").click(function () {
    $("#fontSizeSlider").toggle([300]);
  });

  const options1 = {
    barColors: [defaultBarColor],
  }
})





