let map;

        function initMap() {
        
        let location = { lat: -6.28371061262145, lng: 106.78046826836253 }
        map = new google.maps.Map(document.getElementById("map"), {
            center: location ,
            zoom: 15,
        })

        var marker = new google.maps.Marker({
            position: location,
            map
        })

}