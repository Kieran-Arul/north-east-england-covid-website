/**************************** Graphing Section ****************************/

/*global L */

/**
 * Class to create graph objects. The free, open source library, {@link https://www.chartjs.org/ ChartJs}, created by Nick Downie in 2013 and accessed for the purpose of this project on 8 Jan 2021, was used to create the graphs. The data for these graphs were taken from the UK government site {@link https://coronavirus.data.gov.uk/details/cases CoronavirusGovUK}.
 * @class
 */
class Graph {

    /**
     * @param {string} id Refers to the ID of the HTML canvas element we want to put the graph in.
     */
    constructor(id) {

        /**
         * @property {string} id Refers to the ID of the canvas element we have chosen to put the graph in.
         */
        this.id = id;

        /**
         * @property {Array<string|number>} xdata Refers to an array of x-axis values.
         */
        this.xdata = [];

        /**
         * @property {string} datasetlabel Refers to the name of the dataset - provides the legend name.
         */
        this.datasetlabel = "";

        /**
         * @property {Array<number>} ydata Refers to an array of y-axis values.
         */
        this.ydata = [];

        /**
         * @property {string} backgroundcolours Refers to the background colour of each data point.
         */
        this.backgroundcolours = "";

        /**
         * @property {number} borderwidth Refers to the border width of a data point on the graph.
         */
        this.borderwidth = 1;

        /**
         * @property {string} bordercolour Refers to the colour of the border around the data point.
         */
        this.bordercolour = "";

        /**
         * @property {number} hoverborderwidth Refers to the resultant border width of a data point when the mouse is hovered over it.
         */
        this.hoverborderwidth = 2;

        /**
         * @property {string} hoverbordercolour Refers to the resultant border colour of a data point when the mouse is hovered over it.
         */
        this.hoverbordercolour = "";

        /**
         * @property {string} titletext Refers to the graph title.
         */
        this.titletext = "";

        /**
         * @property {number} titlefontsize Refers to the font size of the graph title.
         */
        this.titlefontsize = 20;

        /**
         * @property {string} legendposition Refers to the position of the legend in relation to the graph. Can either be top/bottom/left/right.
         */
        this.legendposition = "bottom";

        /**
         * @property {number} paddingleft Refers to left padding applied to the entire graph.
         */
        this.paddingleft = 0;

        /**
         * @property {number} paddingright Refers to right padding applied to the entire graph.
         */
        this.paddingright = 0;

        /**
         * @property {number} paddingtop Refers to top padding applied to the entire graph.
         */
        this.paddingtop = 0;

        /**
         * @property {number} paddingbottom Refers to bottom padding applied to the entire graph.
         */
        this.paddingbottom = 0;
    }

    /**
     * @async
     * @property {Function} plot Plots a specific type of graph based on the user-set properties and data.
     * @param {string} graphType The type of graph that the user wants to plot.
     * @param {string} url The link/file path that points to where the data is stored.
     */
    async plot (graphType, url) {

        /**
         * Waits for and then stores the result/promise that comes from the fetch request.
         * @type {Promise}
         */
        let response = await fetch(url);

        /**
         * Waits for and then converts the promise to text.
         * @type {string}
         */
        let csvData = await response.text();

        /**
         * Array where each element is a row of the data table. First row is skipped as that is the header row. Array is also reversed because the data comes in with the most recent data first.
         * @type {Array}
         */
        let rows = csvData.split("\n").slice(1).reverse();

        for (let i = 0; i < rows.length; i++) {
            
            /**
             * Splits up each row to create an array where each element is a piece of data (column) in a row.
             * @type {string}
             */
            let rowData = rows[i].split(",");

            // Appends first element of the array (dates) to the xdata array (x-axis values)
            this.xdata.push(rowData[0]);

            // Converts it to an integer and then appends the second element of the array to the data array
            // These are the y-axis values referring to the number of cases
            this.ydata.push(parseInt(rowData[1]));
            
        }

        // Gives us access to the specific HTML canvas element we want to put the graph in.
        let canvasElement = document.querySelector("#" + this.id).getContext("2d");

        /* eslint-disable */
        let chartItself = new Chart(canvasElement, {
        /* eslint-enable */

            /**
             * The type of graph that the user wants to plot.
             * @type {string}
             */
            type: graphType,

            /**
             * @typedef {Object} data
             * @property {Array<string|number>} labels This is where the x-axis values are passed in
             * @property {Array<Object>} datasets Each element in this array is an object whose properties define custom configurations pertaining to the y-axis values
             */
            
            /**
             * User provided configurations pertaining to the data aspect of the graph.
             * @type {data}
             */
            data: {

                labels: this.xdata,

                datasets: [{
                    label: this.datasetlabel,
                    data: this.ydata,
                    backgroundColor: this.backgroundcolours,
                    borderWidth: this.borderwidth,
                    borderColor: this.bordercolour,
                    hoverBorderWidth: this.hoverborderwidth,
                    hoverBorderColor: this.hoverbordercolour,
                    fill: false
                }]
            },

            /**
             * @typedef {Object} options
             * @property {Object} title The properties of this object pertain to the styling of the graph title.
             * @property {Object} legend The properties of this object pertain to the styling of the graph legend.
             * @property {Object} layout The properties of this object pertain to the layout of the graph. For example, its padding.
             * @property {Object} scales The properties of this object pertain to how the axes on the graph are scaled. For example, what the starting value of the y-axis will be.
             */

            /**
             * Configurations pertaining to the look of the graph. Some are user-provided choices while others have been hard coded to prevent excessive configuration.
             * @type {options}
             */
            options: {

                title: {
                    display: true,
                    text: this.titletext,
                    fontSize: this.titlefontsize
                },

                legend: {
                    display: true,
                    position: this.legendposition,
                    labels: {
                        fontColor: "#000"
                    }
                },

                layout: {

                    padding: {
                        left: this.paddingleft,
                        right: this.paddingright,
                        bottom: this.paddingbottom,
                        top: this.paddingtop
                    }

                },

                scales: {

                    yAxes: [{

                        ticks: {
                            beginAtZero: true
                        }

                    }]

                }

            }

        });

        
        // Switch statement that enables us to update the correct latest statistics below the correct graph
        switch (this.id) {

            // Updates the number below the infected graph to be the latest number of infected people
            case "infected-chart":
                
                $(".infected-num").text("Current Infected: " + this.ydata[this.ydata.length - 1]);
                break;

            // Updates the number below the death graph to be the latest number of dead people
            case "death-chart":
                
                $(".death-num").text("Current Dead: " + this.ydata[this.ydata.length - 1]);
                break;

            // Updates the number below the hospital graph to be the latest number of hospitalised people
            case "hospital-chart":
                
                $(".occupancy-num").text("Current Occupancy: " + this.ydata[this.ydata.length - 1]);
                break;
            
            // Error handling: Logs the ID if the provided one does not exist in the HTML Doc
            default:

                console.log(this.id);
                break;
        }

    }

}

/**************************** GRAPH INITIALISATION AND PLOTTING ****************************/

// Initialises the infected graph
let infectedGraph = new Graph("infected-chart");

// Sets the properties of the infected graph
infectedGraph.datasetlabel = "Number of Infected";
infectedGraph.backgroundcolours = "rgba(54, 162, 235, 0.6)";
infectedGraph.bordercolour = "#000";
infectedGraph.hoverbordercolour = "#7F9800";
infectedGraph.titletext = "Newcastle: Trend in Infected";

// Plots the infection graph
infectedGraph.plot("bar", "newcastle-infected.csv");

// Initialises the death graph
let deathGraph = new Graph("death-chart");

// Sets the properties of the death graph
deathGraph.datasetlabel = "Number of Dead";
deathGraph.backgroundcolours = "rgba(255, 159, 64, 0.6)";
deathGraph.bordercolour = "#000";
deathGraph.hoverbordercolour = "#FF4C68";
deathGraph.titletext = "Newcastle: Trend in Deaths";

// Plots the death graph
deathGraph.plot("bar", "newcastle-deaths.csv");

// Initialises the hospital graph
let hospitalGraph = new Graph("hospital-chart");

// Sets the properties of the hospital graph
hospitalGraph.datasetlabel = "Hospital Occupancy";
hospitalGraph.backgroundcolours = "rgba(255, 99, 132, 1)";
hospitalGraph.bordercolour = "#000";
hospitalGraph.hoverbordercolour = "#66FFFF";
hospitalGraph.titletext = "Newcastle: Hospital Occupancy Due to Covid-19";

// Plots the hospital graph
hospitalGraph.plot("bar", "newcastle-hospitalised.csv");


/****************************** BUTTON BEHAVIOUR SECTION ******************************/

/******** BUTTON ANIMATION FUNCTIONS ********/

/**
 * After the risk level button is clicked, this function first makes the button disappear. Secondly, it runs the loading spinner for 5 seconds before making it disappear as well. Finally, it shows the risk level as well as a button prompt to look at the government guidelines.
 * @function
 * @name showRiskLevel
 * @returns {void}
 */
function showRiskLevel() {
    
    // Hides the risk button
    $(".risk-button").addClass("hidden-element");

    // Starts the loading spinner
    $(".risk-button-box .spinner-border").removeClass("hidden-element");

    // Hides the loading spinner after 5 seconds
    setTimeout(() => {
        $(".risk-button-box .spinner-border").addClass("hidden-element");
    }, 5000);

    // Shows the risk level just after the loading spinner disappears
    setTimeout(() => {
        $(".risk-level").removeClass("hidden-element");
        $(".question-btn").removeClass("hidden-element");
    }, 5200);

}

/**
 * After the hospital availability button is clicked, this function first makes the button disappear, then runs the loading spinner for 5 seconds before making it disappear as well. Finally, it shows the hospital availability in that region.
 * @function
 * @name showAvailabilityLevel
 * @returns {void}
 */
function showAvailabilityLevel() {
    
    // Hides the hospital availability button
    $(".availability-button").addClass("hidden-element");

    // Shows the loading spinner
    $(".availability-button-box .spinner-border").removeClass("hidden-element");

    // Hides the loading spinner after 5 seconds
    setTimeout(() => {
        $(".availability-button-box .spinner-border").addClass("hidden-element");
    }, 5000);

    // Shows the hospital occupancy percentage just after the loading spinner disappears
    setTimeout(() => {
        $(".availability-level").removeClass("hidden-element");
    }, 5200);

}

/******** BUTTON EVENT LISTENERS ********/

// Allows us to access the risk level button
let riskButton = document.querySelector(".risk-button");

/**
 * Event listener that listens for clicks on the risk level button. It then calculates the percentage change in confirmed Covid-19 cases in that region within the past week. Based on this percentage change, it then tells the user whether it is a high, medium or low risk area.
 * @listens click
 */
riskButton.addEventListener("click", function () {
    
    /**
     * Gets the length of the no. of infected cases data array.
     * @type {number}
     */
    let infGraphLen = infectedGraph.ydata.length;

    /**
     * Gets the number of infected cases.
     * @type {number}
     */
    let a = infectedGraph.ydata[infGraphLen - 1];

    /**
     * Gets the number of infected cases 1 week ago.
     * @type {number}
     */
    let b = infectedGraph.ydata[infGraphLen - 8];

    /**
     * Calculates the percentage change in cases in the latest week.
     * @type {number}
     */
    let weeklyInfDelta = ((a - b) / b) * 100;

    /**
     * If percentage change is less than 1%, classify the area as low risk. Animation of this process is done by the showRiskLevel function. See {@link showRiskLevel}
     */
    if (weeklyInfDelta < 1) {
        
        $(".risk-text").text("Low Risk");
        showRiskLevel();
    
    /**
     * If percentage change is between 1-3%, classify the area as medium risk. Animation of this process is done by the showRiskLevel function. See {@link showRiskLevel}
     */
    } else if ((1 <= weeklyInfDelta) && (weeklyInfDelta < 3)) {

        $(".risk-text").text("Medium Risk");
        showRiskLevel();
    
    /**
     * If percentage change exceeds 3%, classify the area as high risk. Animation of this process is done by the showRiskLevel function. See {@link showRiskLevel}
     */
    } else {

        $(".risk-text").text("High Risk");
        showRiskLevel();
    }

});

// Allows us to access the hospital availability button
let availabilityButton = document.querySelector(".availability-button");

/**
 * Event listener that listens for clicks on the hospital availability level button. It then calculates what percentage of hospital beds are occupied by those suffering from Covid-19, then outputs the result for the user to see.
 * @listens click
 */
availabilityButton.addEventListener("click", function () {
    
    /**
     * Gets the length of the hospital occupancy data array.
     * @type {number}
     */
    let hosGraphLen = hospitalGraph.ydata.length;

    /**
     * Gets the current number of people hospitalised due to Covid-19 in that region.
     * @type {number}
     */
    let currentHospitalised = hospitalGraph.ydata[hosGraphLen - 1];

    /**
     * Gets the percentage of hospital beds that are currently occupied.
     * @type {number}
     */
    let availabilityPerc = Math.ceil((currentHospitalised / 1331) * 100);

    /**
     * Shows the viewer the percentage of beds that are occupied. Animation of this process is done by the showRiskLevel function. See {@link showAvailabilityLevel}
     */
    $(".availability-text").text("Beds Occupied: " + availabilityPerc + "%");
    showAvailabilityLevel();

});

/****************************** MAP SECTION ******************************/

/******** MAP STYLING AND EVENT FUNCTIONS ********/

/**
 * Assigns a specific colour to a district on the choropleth map based on how many coronavirus cases it has.
 * @function
 * @name setDistrictColour
 * @param {number} cases Refers to the number of coronavirus cases in that district.
 * @returns {string} The colour hexcode corresponding to the range that the number of coronavirus cases fall in.
 */
function setDistrictColour(cases) {

    if (cases > 7000) {

        return "#BD0026";

    } else if (cases > 5000) {

        return "#FC4E2A";

    } else if (cases > 3000) {

        return "#FEB24C";

    } else {

        return "#FFEDA0";

    }
    
}

/**
 * @typedef {Object} districtStyle
 * @property {string} fillColor The hexcode that the district will be coloured in with (dependent on number of coronavirus cases).
 * @property {number} weight The thickness of the border surrounding the district.
 * @property {number} opacity The opacity of the border surrounding the district.
 * @property {string} color The colour of the border surrounding the district.
 * @property {string} dashArray How dotted the border line surrounding the district is.
 * @property {number} fillOpacity The opacity of the colour that fills the district.
 */

/**
 * Styles a specific district on the choropleth map by targeting specific styling attributes.
 * @function
 * @name setDistrictStyle
 * @param {Object} area The object from the geojson file that contains the property and geometry data of a specific district.
 * @returns {districtStyle} The object containing the styling attributes and their corresponding values.
 */
function setDistrictStyle(area) {

    return {

        fillColor: setDistrictColour(area.properties.cases),
        weight: 2,
        opacity: 1,
        color: '#000',
        dashArray: '1',
        fillOpacity: 0.6

    };

}

/**
 * Changes several properties of the border style of a specific district - triggered as part of an event listener.
 * @function
 * @name highlightDistrict
 * @param {Object} event An automatically returned object that contains information pertaining to the event that triggered this function.
 * @returns {void}
 */
function highlightDistrict(event) {
    
    let layer = event.target;

    layer.setStyle({
        weight: 2,
        color: '#87CEEF',
        dashArray: '1',
        fillOpacity: 0.7
    });

}

/**
 * The function that is responsible for defining each triggering event, the callback function associated with it and applying that function to the specific district's border on the choropleth map.
 * @function
 * @name onEachEvent
 * @param {MouseoverEvent} district Refers to a mouseover event over a specific district.
 * @param {Object} layer The object pertaining to the border of that district.
 * @listens MouseoverEvent
 * @returns {void}
 */
function onEachEvent(district, layer) {

    layer.on({
        mouseover: highlightDistrict
    });

    console.log(district);
}

/**
 * The function that is responsible for using the provided geojson data to plot a choropleth map in the correct location and providing each of the districts with the defined styles and event listeners. The free, open source JavaScript library, {@link https://leafletjs.com/ LeafletJs}, created by Vladimir Agafonkin in 2011 and accessed for the purpose of this project on 12 Jan 2021, was used to create the maps. The geojson data for these maps, called {@link https://martinjc.github.io/UK-GeoJSON/ UK-GeoJSON} was created by Martin JC in 2014 and was obtained for the purpose of this project on 12 Jan 2021. The author has clearly stated on his GitHub page that we are free to use the information he has shared.
 * @async
 * @function
 * @name plotMap
 * @param {string} filePath This the path to the geojson file containing the properties and coordinates of each district.
 * @returns {void}
 */
async function plotMap(filePath) {

    let response = await fetch(filePath);
    let regionData = await response.json();

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
        id: 'mapbox/light-v9',
        attribution: 'Contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    var regionDistricts = regionData.features;

    L.geoJson(regionDistricts, {

        style: setDistrictStyle,
        onEachFeature: onEachEvent

    }).addTo(map);
    
}

/******** MAP INITIALISATION AND PLOTTING ********/

/**
 * This defines a unique token that must be used to in order to have access to the mapbox API, which is responsible for giving the choropleth map some custom styles.
 * @type {string}
 */
let mapboxAccessToken = "pk.eyJ1IjoiYmVhbnplbHRvbiIsImEiOiJja2s1b3pjZ2QwOWFnMnFudzR6MGc5eG82In0.T5olNmqdAfcGoXeGAdrfWg";

// Accesses the HTML element where the choropleth map will be plotted, setting the foundation to plot it
// The setview method refers to the starting latitude, longitude and zoom of the initial position of the map.
let map = L.map('newcastle-map').setView([55.01, -1.65], 10.5);

// Plots the map
plotMap("newcastle-map.geojson").catch(error => {
    console.log(error);
});
