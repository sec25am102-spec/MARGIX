// ==========================================
// MARGIX MAIN JAVASCRIPT
// ==========================================

let map;

let markers = [];

let amenityMarkers = [];

let userMarker;


// Chennai default location
const defaultLocation = {
    lat: 13.0827,
    lng: 80.2707
};


// ==========================================
// INITIALIZE GOOGLE MAP
// ==========================================

function initMap() {

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: defaultLocation,
            zoom: 12,

            mapTypeControl: true,

            streetViewControl: false,

            fullscreenControl: true
        }
    );


    // Search box

    const searchInput =
        document.getElementById("searchBox");

    const searchBox =
        new google.maps.places.SearchBox(searchInput);


    map.addListener("bounds_changed", function() {

        searchBox.setBounds(map.getBounds());

    });


    searchBox.addListener("places_changed", function() {

        const places = searchBox.getPlaces();

        if (!places.length) {
            return;
        }

        const place = places[0];

        if (!place.geometry ||
            !place.geometry.location) {

            return;
        }

        map.setCenter(place.geometry.location);

        map.setZoom(15);

    });


    // Load hazard markers

    displayHazards(hazards);

    updateDashboard();

    createHazardTable();

}


// ==========================================
// CLEAR HAZARD MARKERS
// ==========================================

function clearHazardMarkers() {

    markers.forEach(function(marker) {

        marker.setMap(null);

    });

    markers = [];

}


// ==========================================
// DISPLAY HAZARDS
// ==========================================

function displayHazards(list) {

    clearHazardMarkers();


    list.forEach(function(hazard) {

        const marker =
            new google.maps.Marker({

                position: {
                    lat: hazard.lat,
                    lng: hazard.lng
                },

                map: map,

                title:
                    hazard.type,

                animation:
                    google.maps.Animation.DROP

            });


        const infoWindow =
            new google.maps.InfoWindow({

                content: createHazardInfo(hazard)

            });


        marker.addListener(
            "click",
            function() {

                infoWindow.open(
                    map,
                    marker
                );

            }
        );


        markers.push(marker);

    });

}


// ==========================================
// HAZARD INFORMATION WINDOW
// ==========================================

function createHazardInfo(hazard) {

    const googleMapsURL =
        `https://www.google.com/maps/dir/?api=1&destination=${hazard.lat},${hazard.lng}`;


    return `

        <div style="
            width:240px;
            font-family:Arial;
        ">

            <h3>
                🚧 ${hazard.type}
            </h3>

            <p>
                <b>ID:</b> ${hazard.id}
            </p>

            <p>
                <b>Severity:</b>
                ${hazard.severity}
            </p>

            <p>
                <b>Confidence:</b>
                ${hazard.confidence}%
            </p>

            <p>
                <b>Status:</b>
                ${hazard.status}
            </p>

            <p>
                ${hazard.description}
            </p>

            <p>
                📅 ${hazard.date}
            </p>

            <a
                href="${googleMapsURL}"
                target="_blank"
                style="
                    display:inline-block;
                    margin-top:8px;
                    padding:8px 12px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:5px;
                "
            >
                📍 Navigate
            </a>

        </div>

    `;

}


// ==========================================
// FILTER HAZARDS
// ==========================================

function showHazards(type) {

    if (type === "all") {

        displayHazards(hazards);

        return;

    }


    const filtered =
        hazards.filter(function(hazard) {

            return hazard.type === type;

        });


    displayHazards(filtered);

}


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {

    const total =
        hazards.length;


    const critical =
        hazards.filter(
            h => h.severity === "Critical"
        ).length;


    const high =
        hazards.filter(
            h => h.severity === "High"
        ).length;


    const medium =
        hazards.filter(
            h => h.severity === "Medium"
        ).length;


    document.getElementById(
        "totalHazards"
    ).textContent = total;


    document.getElementById(
        "criticalCount"
    ).textContent = critical;


    document.getElementById(
        "highCount"
    ).textContent = high;


    document.getElementById(
        "mediumCount"
    ).textContent = medium;


    updateRepairStatus();

}


// ==========================================
// REPAIR STATUS
// ==========================================

function updateRepairStatus() {

    const detected =
        hazards.filter(
            h => h.status === "Detected"
        ).length;


    const reported =
        hazards.filter(
            h => h.status === "Reported"
        ).length;


    const repair =
        hazards.filter(
            h => h.status === "Under Repair"
        ).length;


    const fixed =
        hazards.filter(
            h => h.status === "Fixed"
        ).length;


    document.getElementById(
        "detectedCount"
    ).textContent = detected;


    document.getElementById(
        "reportedCount"
    ).textContent = reported;


    document.getElementById(
        "repairCount"
    ).textContent = repair;


    document.getElementById(
        "fixedCount"
    ).textContent = fixed;


    const total =
        hazards.length || 1;


    document.getElementById(
        "detectedBar"
    ).style.width =
        (detected / total * 100) + "%";


    document.getElementById(
        "reportedBar"
    ).style.width =
        (reported / total * 100) + "%";


    document.getElementById(
        "repairBar"
    ).style.width =
        (repair / total * 100) + "%";


    document.getElementById(
        "fixedBar"
    ).style.width =
        (fixed / total * 100) + "%";

}


// ==========================================
// HAZARD TABLE
// ==========================================

function createHazardTable() {

    const table =
        document.getElementById(
            "hazardTable"
        );


    table.innerHTML = "";


    hazards.forEach(function(hazard) {

        let badgeClass = "";


        if (hazard.severity === "Critical") {

            badgeClass =
                "critical-badge";

        }

        else if (hazard.severity === "High") {

            badgeClass =
                "high-badge";

        }

        else {

            badgeClass =
                "medium-badge";

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${hazard.id}</td>

            <td>
                ${hazard.type}
            </td>

            <td>
                <span class="badge ${badgeClass}">
                    ${hazard.severity}
                </span>
            </td>

            <td>
                ${hazard.confidence}%
            </td>

            <td>
                <span class="badge status-badge">
                    ${hazard.status}
                </span>
            </td>

            <td>
                ${hazard.lat.toFixed(4)},
                ${hazard.lng.toFixed(4)}
            </td>

            <td>

                <button
                    class="map-button"
                    onclick="
                        focusHazard(
                            '${hazard.id}'
                        )
                    "
                >
                    🗺️ View
                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


// ==========================================
// FOCUS HAZARD
// ==========================================

function focusHazard(id) {

    const hazard =
        hazards.find(
            h => h.id === id
        );


    if (!hazard) {

        return;

    }


    map.setCenter({

        lat: hazard.lat,

        lng: hazard.lng

    });


    map.setZoom(17);


    showSection("dashboard");

}


// ==========================================
// SHOW SECTION
// ==========================================

function showSection(section) {

    document.getElementById(
        "dashboard"
    ).classList.add("hidden");


    document.getElementById(
        "hazards"
    ).classList.add("hidden");


    document.getElementById(
        "amenities"
    ).classList.add("hidden");


    document.getElementById(
        section
    ).classList.remove("hidden");


    if (section === "dashboard") {

        setTimeout(function() {

            google.maps.event.trigger(
                map,
                "resize"
            );

        }, 200);

    }

}


// ==========================================
// NEARBY AMENITIES
// ==========================================

function showAmenities(type) {

    if (!map) {

        alert("Google Map is still loading.");

        return;

    }


    clearAmenityMarkers();


    const center =
        map.getCenter();


    let keyword = "";


    let title = "";


    if (type === "hospital") {

        keyword = "hospital";

        title = "🏥 Nearby Hospitals";

    }

    else if (type === "police") {

        keyword = "police station";

        title = "🚓 Nearby Police Stations";

    }

    else if (type === "petrol") {

        keyword = "petrol pump";

        title = "⛽ Nearby Petrol Pumps";

    }

    else if (type === "school") {

        keyword = "school";

        title = "🏫 Nearby Schools";

    }


    document.getElementById(
        "amenityTitle"
    ).textContent = title;


    showSection("amenities");


    const service =
        new google.maps.places.PlacesService(map);


    service.nearbySearch({

        location: center,

        radius: 5000,

        keyword: keyword

    }, function(results, status) {


        if (
            status !==
            google.maps.places.PlacesServiceStatus.OK
        ) {

            document.getElementById(
                "placesList"
            ).innerHTML =
                "<p>No nearby places found.</p>";

            return;

        }


        displayPlaces(
            results.slice(0, 10)
        );

    });

}


// ==========================================
// DISPLAY PLACES
// ==========================================

function displayPlaces(places) {

    const container =
        document.getElementById(
            "placesList"
        );


    container.innerHTML = "";


    places.forEach(function(place) {

        if (!place.geometry) {

            return;

        }


        const location =
            place.geometry.location;


        const marker =
            new google.maps.Marker({

                map: map,

                position: location,

                title: place.name,

                icon: {
                    url:
                        "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }

            });


        amenityMarkers.push(marker);


        const navigationURL =
            `https://www.google.com/maps/dir/?api=1&destination=${location.lat()},${location.lng()}`;


        const item =
            document.createElement("div");


        item.className =
            "place-item";


        item.innerHTML = `

            <div>

                <h4>
                    ${place.name}
                </h4>

                <p>
                    ${
                        place.vicinity ||
                        "Address unavailable"
                    }
                </p>

                ${
                    place.rating
                    ?
                    `<p>⭐ ${place.rating}</p>`
                    :
                    ""
                }

            </div>


            <div>

                <a
                    href="${navigationURL}"
                    target="_blank"
                >

                    <button class="navigate-btn">
                        📍 Navigate
                    </button>

                </a>

            </div>

        `;


        container.appendChild(item);


        marker.addListener(
            "click",
            function() {

                map.setCenter(
                    location
                );

                map.setZoom(17);

            }
        );

    });

}


// ==========================================
// CLEAR AMENITY MARKERS
// ==========================================

function clearAmenityMarkers() {

    amenityMarkers.forEach(
        function(marker) {

            marker.setMap(null);

        }
    );


    amenityMarkers = [];

}


// ==========================================
// USER LOCATION
// ==========================================

function locateUser() {

    if (!navigator.geolocation) {

        alert(
            "Geolocation is not supported."
        );

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const location = {

                lat:
                    position.coords.latitude,

                lng:
                    position.coords.longitude

            };


            map.setCenter(location);

            map.setZoom(16);


            if (userMarker) {

                userMarker.setMap(null);

            }


            userMarker =
                new google.maps.Marker({

                    position: location,

                    map: map,

                    title: "Your Location",

                    icon: {
                        url:
                            "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    }

                });

        },


        function() {

            alert(
                "Unable to get your location."
            );

        }

    );

}
