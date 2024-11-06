


// au clic sur btn-search on reccupère les infos depart arrivée et date
document.querySelector("#btn-search").addEventListener("click", function () {
    let departure = document.querySelector("#depart").value;
    let arrival = document.querySelector("#arrivee").value;
    let date = document.querySelector("#date").value;
    // on accède à notre route pour les conditions
    fetch(`http://localhost:3000/travel/${departure}/${arrival}/${date}`)
	.then(response => response.json())
	.then(data => { 
        console.log(data.travels)
		if (data.travels) { //on enlève l'image et le bloc de texte et on rajoute les noms des différents voyages
                document.querySelector('#imgdroit').remove();
                document.querySelector('#texteBlocDroit').remove();
                for (let i = 0; i<data.travels.length; i++) {
                let travelDate = new Date (data.travels[i].date)
                document.querySelector("#blocDroit").innerHTML += `
                <div class="voyage" id='${data.travels[i]._id}'>
                <p class="voyageList"> ${data.travels[i].departure}>${data.travels[i].arrival} ${travelDate.getHours()}:${travelDate.getMinutes()} ${data.travels[i].price}€ </p>
                <a href="cart.html"> <button type="button" class="btn-book">Book</button> </a>
                </div>
                 `    
            }
            let resultTravels = document.querySelectorAll('.btn-book')
            for (let i=0; i<resultTravels.length; i++) {
                document.querySelectorAll(".btn-book")[i].addEventListener("click", function () { 
                    fetch(`http://localhost:3000/travel/cartTrue/${this.parentNode.parentNode.id}`, {method: "PUT"})
                    .then(response => response.json()) 
                    .then(data => {
                        console.log('ceci est le console de data dans bouton btnbook => ',data)
                    })
                 })
            }
            console.log('resultat de resultTravels',resultTravels.length)
			 } else { // si aucun voyage trouvé, on met une image notfound
                document.querySelector('#imgdroit').src = "images/notfound.png"
                document.querySelector('#texteBlocDroit').textContent = "No trip found."
                
		}});
});




                 //fonction au clic sur le bouton btn-book
            function boutonBook(){
                 document.querySelectorAll(".btn-book").addEventListener("click", function () { console.log("coucou")
                    fetch(`http://localhost:3000/travel/cartTrue/${this.parentNode.parentNode.id}`, {method: "PUT"})
                    .then(response => response.json()) 
                    .then(data => {
                        console.log('ceci est le console de data dans bouton btnbook => ',data)
                    })
                 })
                }

