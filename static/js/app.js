//initializing function for belly button data
function init() {
   
    d3.json("samples.json").then((sample) => {
        //populate the select box with the sample names
        var sampleNames = sample[0].names;
        d3.select("#selDataset")
            .selectAll('myOptions')
            .data(sampleNames)
            .enter()
            .append('option')
            .text(function(d){return d;})
            .attr("value",function(d,i){return d,i;});

        //initialize the metadata to the first sample
        var metaData=sample[0].metadata[0];
            d3.select("#sample-metadata")
            .append("p")
            .text( "ID: "+metaData.id)
            .append("p")
            .text("Ethnicity: "+metaData.ethnicity)
            .append("p")
            .text("Gender: "+metaData.gender)
            .append("p")
            .text("Age: "+metaData.age)
            .append("p")
            .text("Location: "+metaData.location)
            .append("p")
            .text("wffeq: "+metaData.wfreq)
            .append("p")
            .text("bbtype: "+metaData.bbtype)
            ;
            //console.log(metaData);

        //initialize the plots    
        d3.json("samples.json").then((sample)=>{
            //take the first 10 samples
            //NOTE THE INSTRUCTIONS ON THIS SAY "TOP 10", but AskBCS assures me that means first 10.
            //That's poor wording on the instructions either way.

            var otu_ids=sample[0].samples[0].otu_ids.slice(0,10).reverse();
            var sample_values=sample[0].samples[0].sample_values.slice(0,10).reverse();
            var otu_labels=sample[0].samples[0].otu_labels.slice(0,10).reverse();

            //Update OTU ID to a string and add the OTU test so it looks pretty
            var strOtuIds=otu_ids.map(function(e){return "OTU "+e.toString()});
            console.log(strOtuIds);
            
            //trace 1 is for bar chart
            var trace1 = {
             x: sample_values,
             y: strOtuIds,
             labels: otu_labels,
             type: "bar",
             orientation: "h"};

            var data=[trace1];    
            Plotly.newPlot('bar', data);

            //The bubble chart uses all of the data
            var bubbleIDs=sample[0].samples[0].otu_ids;
            var bubbleValues=sample[0].samples[0].sample_values;
            var bubbleLabels=sample[0].samples[0].otu_labels;
            //trace 2 is for the bubble chart
            var trace2={
            x: bubbleIDs,
            y: bubbleValues,
            text: bubbleLabels,
            mode: 'markers',
            marker: {
                color: bubbleIDs,
                size: bubbleValues
                }    
            }
            var bubbleData = [trace2];
  
            var layout = {
            showlegend: false,
            height: 600,
            width: 1000
            };
  
            Plotly.newPlot('bubble', bubbleData, layout);
        
        });
        
       
        
        });
    }


  
 // This function is called when a dropdown menu item is selected
 function optionChanged() {
   // Use D3 to select the dropdown menu
   var dropdownMenu = d3.select("#selDataset");
   // Assign the value of the dropdown menu option to a variable
   var sampleID = dropdownMenu.property("value");


     //check to make sure sampleID is the correct value (It is)
   console.log(sampleID);
   //pull the data and update the charts based on the selected subject
   d3.json("samples.json").then((sample)=>{

    //update metadata
    var metaData=sample[0].metadata[sampleID];
    d3.select("#sample-metadata")
    .selectAll("p")
    .remove();
    d3.select("#sample-metadata")
    .append("p")
    .text( "ID: "+metaData.id)
    .append("p")
    .text("Ethnicity: "+metaData.ethnicity)
    .append("p")
    .text("Gender: "+metaData.gender)
    .append("p")
    .text("Age: "+metaData.age)
    .append("p")
    .text("Location: "+metaData.location)
    .append("p")
    .text("wffeq: "+metaData.wfreq)
    .append("p")
    .text("bbtype: "+metaData.bbtype)
    ;

    //get appropriate values for subject for the bar and bubble charts
    var otu_ids=sample[0].samples[sampleID].otu_ids.slice(0,10).reverse();
    var sample_values=sample[0].samples[sampleID].sample_values.slice(0,10).reverse();
    var otu_labels=sample[0].samples[sampleID].otu_labels.slice(0,10).reverse();
    var upstrOtuIds=otu_ids.map(function(e){return "OTU "+e.toString()});
    var bubbleIDs=sample[0].samples[sampleID].otu_ids;
    var bubbleValues=sample[0].samples[sampleID].sample_values;
    var bubbleLabels=sample[0].samples[sampleID].otu_labels;
    marker={
        color: bubbleIDs,
        size: bubbleValues
        };     
  


   // update the plots
    Plotly.restyle("bar", "x", [sample_values]);
    Plotly.restyle("bar", "y", [upstrOtuIds]);
    Plotly.restyle("bar","labels",[otu_labels]);
    Plotly.restyle("bubble", "x", [bubbleIDs]);
    Plotly.restyle("bubble", "y", [bubbleValues]);
    Plotly.restyle("bubble","text",[bubbleLabels]);
    Plotly.restyle("bubble","marker",[marker]);
   })
}

//call the init function
init();
