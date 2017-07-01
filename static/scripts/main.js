function main() {
    app.APIHandler.getAPIData("http://swapi.co/api/planets/", app.DOMHandler.populatePlanetsTable);
}

$('document').ready(main);
