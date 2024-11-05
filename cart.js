const { all } = require("../backend/routes");

function updateDeleteTravelEventListener() {
	for (let i = 0; i < document.querySelectorAll('.deleteTravel').length; i++) {
		document.querySelectorAll('.deleteTravel')[i].addEventListener('click', function () {
			fetch(`http://localhost:3000/travel/${this.id}`, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => {
					if (data.result) {
						this.parentNode.remove();
					}
				});
		});
	}
}

//departure time à modifier !!!
fetch('http://localhost:3000/travel')
.then(response => response.json())
.then(allTravels => {
    const travelsInCart = allTravels.filter((travel) => travel.cart === true)
    for (item of travelsInCart) {
        document.querySelector('#cart').innerHTML += `
                <div class="travelDetail">
                    <div id="path">${item.departure}>${item.arrival}</div>
                    <div id="departureTime">20:09</div> 
                    <div id="price">${item.price}</div>
                    
                    <button class="deleteTravel">X</button>
                    
                </div>`
    }
})