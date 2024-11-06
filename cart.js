// import moment from 'moment';
// console.log(moment.now());

function updateDeleteTravelEventListener() {
  for (let i = 0; i < document.querySelectorAll(".deleteTravel").length; i++) {
    document
      .querySelectorAll(".deleteTravel")
      [i].addEventListener("click", function () {
        fetch(`http://localhost:3000/travel/cartFalse/:${this.id}`, { method: "PUT" })
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
	if (travelsInCart){
		for (item of travelsInCart) {
			let travelDate= new Date(item.date)
		  document.querySelector("#cartContent").innerHTML += `
					<div class="travelDetail">
						<div id="path">${item.departure}>${item.arrival}</div>
						<div id="departureTime">${travelDate.getHours()}:${travelDate.getMinutes()}</div> 
						<div id="price">${item.price}€</div>
						
						<button class="deleteTravel">X</button>
						
					</div>`;
		} updateDeleteTravelEventListener();
	}else{
		document.querySelector("#cartContent").innerHTML += `
		<p>No tickets in your cart.</p>
		<p>Why not plan a trip?</p>`
	}
    
  });
