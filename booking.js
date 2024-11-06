fetch("http://localhost:3000/travel")
.then((response) => response.json())
.then((allTravels) => {
    const travelsBooked = allTravels.travels.filter((travel) => travel.booking === true);
    if (travelsBooked.length>0) {
        
        for (item of travelsBooked) {
            let travelDate= new Date(item.date)
            let today = new Date()
            document.querySelector('#bookingContent').innerHTML += `
                    <div id="${item._id}" class="travelDetail" >
						<div id="path">${item.departure}>${item.arrival}</div>
						<div id="departureTime">${travelDate.getHours()}:${travelDate.getMinutes()}</div> 
						<div id="price">${item.price}€</div>
                        <div id="departTime"> Departure in ${travelDate.getHours()-today.getHours()} hours</div>
					</div>`
        }
    }else {
        document.querySelector("#myBooking").remove()
        document.querySelector('#bookingContent').innerHTML += `
        <div id="noBooking">
        <p>No booking yet.</p>
        <p>Why not plan a trip?</p>
        </div>`
    }
})


