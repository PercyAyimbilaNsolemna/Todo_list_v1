
//Exports the getDate module
exports.getDate = function() {

    const today = new Date();

    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }

    let day = today.toLocaleDateString("en-US", options);

    return day;
}

//Exports the getDay anonymous function
exports.getDay = function() {

    const today = new Date();

    let options = {
        weekday: "long",
    }

    let day = today.toLocaleDateString("en-US", options);

    return day;
}