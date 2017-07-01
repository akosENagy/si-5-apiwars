var app = app || {};

app.DOMHandler = {

    populatePlanetsTable: function(planetData) {
        var table = document.getElementById('planets-tablebody');
        $(table).empty();

        //Set the buttons
        $('#next-button').off();
        $('#next-button').on("click", function() {
            nextPageUrl = planetData["next"];
            app.APIHandler.getAPIData(nextPageUrl, app.DOMHandler.populatePlanetsTable);
        });
        $('#previous-button').off();
        $('#previous-button').on("click", function() {
            previousPageUrl = planetData["previous"];
            app.APIHandler.getAPIData(previousPageUrl, app.DOMHandler.populatePlanetsTable);
        });


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
                
                tdStr = planetData[i][properties[j]];
                switch(properties[j]) {
                    case "diameter":
                        if (tdStr !== "unknown") {
                            tdStr = this.numberWithCommas(tdStr).toString();
                            tdStr += " km";
                        }
                        break;
                    case "population":
                        if (tdStr !== "unknown") {
                            tdStr = this.numberWithCommas(tdStr).toString();
                            tdStr += " people";
                        }
                        break;
                    case "surface_water":
                        if (tdStr !== "unknown") {
                            tdStr += "%";
                        }
                        break;
                    case "residents":
                        tdStr = this.getResidentsButton(tdStr);
                        tableData.setAttribute("data-planetname", row.firstChild.innerHTML);                                    
                        break;
                    default:
                        break;
                }

                if (properties[j] === "residents") {
                    if (typeof tdStr === "string") {
                        tableData.innerHTML = tdStr;                    
                    } else {
                        tableData.appendChild(tdStr);
                    }
                } else {
                    tableData.innerHTML = tdStr;
                }
                row.appendChild(tableData);
            }
            tableRows.push(row);
        }
        return tableRows;
    },

    getResidentsButton: function(residentLinksList) {
        if (residentLinksList.length === 0) {
            return "No known residents";
        }

        var residentsNumber = residentLinksList.length;
        var residentsButton = document.createElement("button");
        residentsButton.className = "residents-button btn btn-info";
        residentsButton.innerHTML = residentsNumber.toString() + " resident(s)";
        residentsButton.addEventListener('click', function() {
            for (var i = 0; i < residentLinksList.length; i++) {
                app.APIHandler.getAPIData(residentLinksList[i], app.DOMHandler.createResidentRow);
            }
            $('#modal-tablebody').empty();
            $('.modal-title').html("Residents of " + this.parentElement.dataset["planetname"]);
            $("#residents-modal").modal();
        })

        return residentsButton;
    },

    createResidentRow: function(residentData) {
        var properties = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"];
        var residentRow = document.createElement("tr");

        for (let i = 0; i < properties.length; i++) {
            var tableData = document.createElement("td");
            tableData.innerHTML = residentData[properties[i]];
            residentRow.appendChild(tableData);
        }
        
        document.getElementById("modal-tablebody").appendChild(residentRow);
    },

    numberWithCommas: function(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}