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
            table.innerHTML += tableRows[i];
        }
    },

    createPlanetRows: function(planetData) {
        var tableRows = [];
        for (let i = 0; i < planetData.length; i++) {
            row = "<tr>";
            row += "<td class='table-data'>";
            row += planetData[i]["name"];
            row += "</td>";
            row += "<td class='table-data'>";
            row += planetData[i]["diameter"] + " km";
            row += "</td>";
            row += "<td class='table-data'>";
            row += planetData[i]["climate"];
            row += "</td>";
            row += "<td class='table-data'>";
            row += planetData[i]["terrain"];
            row += "</td>";
            row += "<td class='table-data'>";
            row += planetData[i]["surface_water"];
            row += "</td>";
            row += "<td class='table-data'>";
            row += planetData[i]["population"] + " people";
            row += "</td>";
            row += "<td class='table-data'>";
            row += planetData[i]["residents"];
            row += "</td>";
            row += "</tr>";
            tableRows.push(row);
        }
        return tableRows;
    },

    
}