var app = app || {};

app.DOMHandler = {

    populatePlanetsTable: function(planetData) {
        var table = document.getElementById('planet-table');

        //Set the buttons
        var nextButton = document.getElementById('next-button');
        nextButton.value = planetData["next"];
        var previousButton = document.getElementById('previous-button');
        previousButton.value = planetData["previous"];

        //Filter result set
        var results = planetData["results"];

        //Set up the rows
        tableRows = app.DOMHandler.createPlanetRows(results);

        //Append rows to table element
        for (let i = 0; i < tableRows.length; i++) {
            table.appendChild(tableRows[i]);
        }
    },

    createPlanetRows: function(planetData) {
        var tableRows = [];
        var properties = ["name", "diameter", "climate", "terrain", "surface_water", "population", "residents"];

        for (let i = 0; i < planetData.length; i++) {
            var row = document.createElement("tr");
            row.className = "table-row";

            for (let j = 0; j < properties.length; j++) {
                var tableData = document.createElement("td");
                tableData.className = "table-data";
                
                dataFormatting = "";
                switch(properties[j]) {
                    case "diameter":
                        dataFormatting = " km";
                        break;
                    case "population":
                        dataFormatting = " people";
                        break;
                    default:
                        break;
                }
                tableData.innerHTML = planetData[i][properties[j]] + dataFormatting;
                row.appendChild(tableData);
            }
            tableRows.push(row);
        }
        return tableRows;
    },

    
}