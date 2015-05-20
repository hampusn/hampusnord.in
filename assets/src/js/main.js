/*!
 * Main script for hampusnordin-limepark.
 * 
 * assets/src/js/main.js
 */
(function($, window, document, undefined) {
  
  // Make sure chart is actually loaded and exist before doing anything.
  if (typeof Chart === "function") {

    // Global override for tooltip format which will show the label and the value as a percentage.
    // Example: "Milk 48%"
    Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%> <%= value %>%<%}%>";

    // All charts keyed by their names and with both the data and optional options.
    var chartData = {
      "introduction": {
        "data": [
          {
            "value": 70,
            "color": "#ddd",
            "highlight": "#aaa",
            "label": "Öl, vin & cocktails"
          },
          {
            "value": 15,
            "color": "#bbb",
            "highlight": "#888",
            "label": "Mat"
          },
          {
            "value": 10,
            "color": "#999",
            "highlight": "#444",
            "label": "Byggnader"
          },
          {
            "value": 5,
            "color": "#666",
            "highlight": "#222",
            "label": "Övrigt & okänt"
          }
        ],
        "options": {
          "percentageInnerCutout": 40,
          "animationSteps": 30,
          "animationEasing": "easeInOutQuint"
        }
      },
      "experience": {
        "data": [
          {
            "value": 40,
            "color":"#517047",
            "highlight": "#65855a",
            "label": "Frontend"
          },
          {
            "value": 20,
            "color":"#485B4D",
            "highlight": "#4D6653",
            "label": "Kundkontakt, idéarbete, research"
          },
          {
            "value": 40,
            "color":"#407E48",
            "highlight": "#44874A",
            "label": "Backend"
          }
        ],
        "options": {
          "percentageInnerCutout": 40,
          "animationSteps": 40,
          "animationEasing": "easeInOutQuint"
        }
      }
    };

    // Will hold all created charts under the same key as they have in chartData above.
    window.Charts = {};


    /**
     * Introduction chart
     */

     var $introduction = $('#chart-introduction');
     if ($introduction.length) {
      // Get the canvas context
      var introductionContext = $introduction.get(0).getContext("2d");

      // Create chart and store to global variable for easier access.
      window.Charts.introduction = new Chart(introductionContext).Doughnut(chartData.introduction.data, chartData.introduction.options);
     }


    /**
     * Experience chart
     */

    var $experience = $('#chart-experience');
    if ($experience.length) {
      // Get the canvas context.
      var experienceContext = $experience.get(0).getContext("2d");

      // Create chart and store to global variable for easier access.
      window.Charts.experience = new Chart(experienceContext).Doughnut(chartData.experience.data, chartData.experience.options);
    }
  } // endif: Chart exists

})(jQuery, this, this.document);