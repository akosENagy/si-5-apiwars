function main() {
    app.APIHandler.getAPIData("https://swapi.co/api/planets/", app.DOMHandler.populatePlanetsTable);
}

$('document').ready(main);
