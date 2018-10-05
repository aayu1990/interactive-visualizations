
function buildMetadata(sample) {
//   // @TODO: Complete the following function that builds the metadata panel
    url="/metadata/" + sample
    d3.json(url).then((sampleNames) => {
    console.log(sampleNames);
    Previous_data=d3.select("#sample-metadata");
    Previous_data.innerHTML = "";
  
//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
    for (i = 0; i < sampleNames.length; i++) { 
    Previous_data.append(Object.entries(sampleNames));
}

    });

// //     // BONUS: Build the Gauge Chart
// //     // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  url="/samples/" + sample
  d3.json(url).then((sampleNames) => {
    console.log(sampleNames);
    // sampleNames.sort(compare);
    var data = [{
      labels: sampleNames.otu_ids.slice(0, 10),
      values: sampleNames.sample_values.slice(0, 10),
      hovertext: sampleNames.otu_labels.slice(0, 10),
      type: 'pie'
    }];
    var layout = {
      height: 400,
       width: 900    
};
Plotly.newPlot('pie', data, layout);
  });  
}
  

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    console.log(sampleNames);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample)});

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log("firstSample");
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
//   buildMetadata(newSample);
}

// Initialize the dashboard
init();
