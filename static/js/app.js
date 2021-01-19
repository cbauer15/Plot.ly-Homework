// // Add event listener for submit button
// d3.select("#selDataset").on("change", optionChanged)


d3.json("../samples.json").then((importedData) => {
    var data = importedData;
    selectBox = d3.select("#selDataset")

    importedData.names.forEach(name => {
        selectBox.append("option").text(name).attr("value", name)
    });


    console.log(data);
    console.log(data.names);
    console.log(data.samples);
});


function optionChanged() {
    d3.json("../samples.json").then((importedData) => {
        var dropdownMenu = d3.select("#selDataset");
        var idLookup = dropdownMenu.property("value");
        var data = importedData;
        var demoInfo = d3.select("#sample-metadata")
        
        console.log(idLookup)
        var filteredmetaData = data.metadata.filter(person => person.id == idLookup)
        // console.log(filteredmetaData)

        var filteredsampleData = data.samples.filter(person => person.id == idLookup)
        console.log(filteredsampleData[0])

        topBacteriaId = filteredsampleData[0].otu_ids.slice(0, 10).reverse();
        topBacteriaValues = filteredsampleData[0].sample_values.slice(0, 10).reverse();

        BacteriaId = filteredsampleData[0].otu_ids
        BacteriaValues = filteredsampleData[0].sample_values

        demoInfo.html("");

        Object.entries(filteredmetaData[0]).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key}: ${value}`)
        });


        var topOTUrace = [{
            x: topBacteriaValues,
            y: topBacteriaId.map(bact => "OTU" + bact),
            text: topBacteriaId.map(bact => "OTU" + bact),
            name: "OTU",
            type: "bar",
            orientation: "h"
        }];

        Plotly.newPlot("bar", topOTUrace)

        var trace1 = {
            y: BacteriaValues,
            x: BacteriaId,
            mode: 'markers',
            marker: {
              colorscale: 'Portland',
              size: BacteriaValues
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size and Color',
            showlegend: false,
            height: 600,
            width: 1200
          };
          
          Plotly.newPlot('bubble', data, layout);






    })
};




