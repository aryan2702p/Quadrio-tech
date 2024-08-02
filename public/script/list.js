document.addEventListener('DOMContentLoaded', () => {
    const bearerToken = localStorage.getItem('token');
    //
    fetch('/api/cars',{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })  // Adjust the endpoint according to your API
        .then(response => response.json())
        .then(data => {
            const cardList = document.getElementById('card-list');
            data.forEach(car => {
                const card = document.createElement('div');
                card.className = 'card';

                // const cardIcon = document.createElement('svg');
                // cardIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                // cardIcon.setAttribute('viewBox', '0 0 24 24');
                // cardIcon.innerHTML = '<path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>';
                const carImage = document.createElement('img');
                carImage.className = 'card__image';
                carImage.setAttribute('src', car.imageUrl);
                carImage.setAttribute('alt', car.carName);

                const cardContent = document.createElement('div');
                cardContent.className = 'card__content';

                const cardTitle = document.createElement('p');
                cardTitle.className = 'card__title';
                cardTitle.textContent = car.carName;

                const cardDescription = document.createElement('p');
                cardDescription.className = 'card__description';
                cardDescription.textContent = `Year: ${car.manufacturingYear}, Price: $${car.price}`;

                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardDescription);
                card.appendChild(carImage);
                card.appendChild(cardContent);

                cardList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching car data:', error));
});
