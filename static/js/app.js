
function init() {
    optionChanged()
}

function optionChanged() {
    d3.json("../samples.json").then((importedData) => {
        var data = importedData;
        var dropdownMenu = d3.select("#selDataset");

        data.names.forEach(name => {
            dropdownMenu.append("option").text(name).attr("value", name)
        });

        var idLookup = dropdownMenu.property("value");
        var demoInfo = d3.select("#sample-metadata")

        console.log(idLookup)

        // Filtering Meta Data
        var filteredmetaData = data.metadata.filter(person => person.id == idLookup)
        console.log(filteredmetaData)
        cleanButton = filteredmetaData[0].wfreq

        // Filtering Sample Data
        var filteredsampleData = data.samples.filter(person => person.id == idLookup)
        console.log(filteredsampleData[0])
        topBacteriaId = filteredsampleData[0].otu_ids.slice(0, 10).reverse();
        topBacteriaValues = filteredsampleData[0].sample_values.slice(0, 10).reverse();
        BacteriaId = filteredsampleData[0].otu_ids
        BacteriaValues = filteredsampleData[0].sample_values
        BacteriaLabel = filteredsampleData[0].otu_labels

        // Summary Table
        demoInfo.html("");
        Object.entries(filteredmetaData[0]).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key}: ${value}`)
        });

        // Bar Graph
        var topOTUrace = [{
            x: topBacteriaValues,
            y: topBacteriaId.map(bact => "OTU" + bact),
            text: BacteriaLabel,
            name: "OTU",
            type: "bar",
            orientation: "h"
        }];
        Plotly.newPlot("bar", topOTUrace)

        // Bubble Chart
        var Bubble = {
            y: BacteriaValues,
            x: BacteriaId,
            text: BacteriaLabel,
            mode: 'markers',
            marker: {
                color: BacteriaId,
                size: BacteriaValues
            }
        };
        var data = [Bubble];
        var layout = {
            title: 'Marker Size and Color',
            showlegend: false,
            height: 600,
            width: 1200
        };
        Plotly.newPlot('bubble', data, layout);

        // Gauge
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: cleanButton,
                title: { text: "Wash Frequency" },
                type: "indicator",
                mode: "gauge+number+delta",
                delta: { reference: 0 },
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 1], color: "red" },
                        { range: [1, 2], color: "orange" },
                        { range: [2, 3], color: "yellow" },
                        { range: [3, 4], color: "green" },
                        { range: [4, 5], color: "blue" },
                        { range: [5, 6], color: "blue" },
                        { range: [6, 7], color: "blue" },
                        { range: [7, 8], color: "blue" },
                        { range: [8, 9], color: "blue" },
                    ],
                    threshold: {
                        line: { color: "purple", width: 4 },
                        thickness: 0.75,
                        value: 7
                    }
                }
            }
        ];
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
    })
};

init()

