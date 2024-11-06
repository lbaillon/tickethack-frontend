

function updateDeleteTravelEventListener() {
  for (let i = 0; i < document.querySelectorAll(".deleteTravel").length; i++) {
    document
      .querySelectorAll(".deleteTravel")
      [i].addEventListener("click", function () {
		console.log(this.parentNode)
		console.log(this.parentNode.id)
        fetch(`http://localhost:3000/travel/cartFalse/${this.parentNode.id}`, { method: "PUT" })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              this.parentNode.remove();
            }
          });
      });
  }
}


fetch("http://localhost:3000/travel")
  .then((response) => response.json())
  .then((allTravels) => {
	console.log(allTravels)
    const travelsInCart = allTravels.travels.filter((travel) => travel.cart === true);
	console.log(travelsInCart)
	if (travelsInCart.length>0){
		for (item of travelsInCart) {
			let travelDate= new Date(item.date)
			
		  document.querySelector("#cartContent").innerHTML += `
					<div class="travelDetail" id="${item._id}">
						<div id="path">${item.departure}>${item.arrival}</div>
						<div id="departureTime">${travelDate.getHours()}:${travelDate.getMinutes()}</div> 
						<div id="price">${item.price}€</div>
						
						<button class="deleteTravel">X</button>
						
					</div>`;
		} updateDeleteTravelEventListener();
	}else{
		document.querySelector("#myCart").remove()
		document.querySelector("#cartContent").innerHTML += `
		<div id="noCart"
		<p>No tickets in your cart.</p>
		<p>Why not plan a trip?</p>
		</div>`
	}
	document.querySelector("#purchaseButton").addEventListener('click',function() {

		document.querySelector("#cartContent").remove()
			for(item of travelsInCart){
				
				fetch(`http://localhost:3000/travel/booking/${item._id}`, { method: "PUT" })
				.then((response)=> response.json())
				.then((bookedTravels) => {
					console.log(bookedTravels)
				})
				fetch(`http://localhost:3000/travel/cartFalse/${item._id}`, {method: "PUT"})
					.then((response)=> response.json())
					.then((outOfCart) => {
						console.log(outOfCart)
					})
			}
		})

  });


