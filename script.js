


// au clic sur btn-search on reccupère les infos depart arrivée et date
document.querySelector("#btn-search").addEventListener("click", function () {
    let departure = document.querySelector("#depart").value;
    let arrival = document.querySelector("#arrivee").value;
    let date = document.querySelector("#date").value;
    // on accède à notre route pour les conditions
    fetch(`http://localhost:3000/travel/${departure}/${arrival}/${date}`)
	.then(response => response.json())
	.then(data => { 
		if (data) { //on enlève l'image et le bloc de texte et on rajoute les noms des différents voyages
                document.querySelector('#imgdroit').remove();
                document.querySelector('#texteBlocDroit').remove();
                for (let i = 0; i<data.travels.length; i++) {
                let travelDate = new Date (data.travels[i].date)
                document.querySelector("#blocDroit").innerHTML += `
                <div class="voyage">
                <p class="voyageList"> ${data.travels[i].departure}>${data.travels[i].arrival} ${travelDate.getHours()}:${travelDate.getMinutes()} ${data.travels[i].price}€ </p>
                <a href="cart.html"><button type="button" id="btn-book">Book</button></a>
                </div>
                 `

            }
			 } else { // si aucun voyage trouvé, on met une image notfound
                document.querySelector('#imgdroit').src = "images/notfound.png"
                document.querySelector('#texteBlocDroit').textContent = "No trip found."
                
		}});
});



