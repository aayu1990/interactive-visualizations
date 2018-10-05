
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
    var datapie = [{
      labels: sampleNames.otu_ids.slice(0, 10),
      values: sampleNames.sample_values.slice(0, 10),
      hovertext: sampleNames.otu_labels.slice(0, 10),
      type: 'pie'
    }];
    var layout = { title: "Bacteria Sample_Value",
      xaxis:{title: "Out_ids"},
      yaxis:{title:"Sample Values"},
      showlegend: false,
      height: 400,
       width: 900
};
var datascatter=[{x:sampleNames.otu_ids,
                  y:sampleNames.sample_values,
                  text:sampleNames.otu_labels,
                  mode:'markers',
                  marker:{color:sampleNames.otu_ids,
                          size:sampleNames.sample_values}
  }];
  var layout3 = {
    title: "Otu_ids Vs Sample_Values",
    xaxis:{title:"Otu_ids"},
    yaxis:{title:"Sample Values"},
    showlegend: false,
    height: 600,
    width:1200
   };

console.log(datascatter);
Plotly.newPlot('pie', datapie, layout);

Plotly.newPlot('bubble',datascatter,layout3);
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
