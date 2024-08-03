document.addEventListener('DOMContentLoaded', () => {
    const bearerToken = localStorage.getItem('token');  // Retrieve token from local storage
   
    const cardList = document.getElementById('card-list');
    const addCarBtn = document.getElementById('addCarBtn');
    const carModal = document.getElementById('carModal');
    const closeBtn = document.querySelector('.close-btn');
    const carForm = document.getElementById('carForm');
    const modalTitle = document.getElementById('modalTitle');
    const carIdInput = document.getElementById('carId');
    const carNameInput = document.getElementById('carName');
    const manufacturingYearInput = document.getElementById('manufacturingYear');
    const priceInput = document.getElementById('price');
    const imageUrlInput = document.getElementById('imageUrl');
    const totalcars = document.getElementById('cars-count');
    const logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    });

    if (!bearerToken) {
        // Handle missing token, e.g., redirect to login
        window.location.href = '/login.html';
        return;
    }
    async function totalCars() {
       const response =  await fetch('/api/admin/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }});
            const data = await response.json();
            
            //console.log(data);
            totalcars.textContent = data.totalCars;
        }

    async function fetchCars() {
       await fetch('/api/cars', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            cardList.innerHTML = '';
            data.forEach(car => {
                const card = document.createElement('div');
                card.className = 'card';
                const cardpack= document.createElement('div');
                cardpack.className = 'cardpack';


                // const cardIcon = document.createElement('svg');
                // cardIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                // cardIcon.setAttribute('viewBox', '0 0 24 24');
                // cardIcon.innerHTML = '<path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>';
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

                // const cardImage = document.createElement('img');
                // cardImage.setAttribute('src', car.imageUrl);
                // cardImage.className = 'card__image';

                const cardActions = document.createElement('div');
                cardActions.className = 'card__actions';

                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.addEventListener('click', () => {
                    openModal(car);
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    deleteCar(car._id);
                });

                cardActions.appendChild(updateBtn);
                cardActions.appendChild(deleteBtn);

                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardDescription);
                //cardContent.appendChild(cardImage);
                card.appendChild(carImage);
                card.appendChild(cardContent);
               // card.appendChild(cardActions);
               cardpack.appendChild(card);
               cardpack.appendChild(cardActions);
                

                cardList.appendChild(cardpack);
                totalCars();
            });
        })
        .catch(error => console.error('Error fetching car data:', error));
    }

    function openModal(car = null) {
        if (car) {
            modalTitle.textContent = 'Update Car';
            carIdInput.value = car._id;
            carNameInput.value = car.carName;
            manufacturingYearInput.value = car.manufacturingYear;
            priceInput.value = car.price;
            imageUrlInput.value = car.imageUrl;
        } else {
            modalTitle.textContent = 'Add Car';
            carForm.reset();
            carIdInput.value
            carIdInput.value = '';
        }

        carModal.style.display = 'block';
    }

    function closeModal() {
        carModal.style.display = 'none';
    }

    function deleteCar(carId) {
        fetch(`/api/cars/${carId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                fetchCars();  
            } else {
                console.error('Error deleting car:', response.statusText);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const carId = carIdInput.value;
        const carData = {
            carName: carNameInput.value,
            manufacturingYear: parseInt(manufacturingYearInput.value),
            price: parseFloat(priceInput.value),
            imageUrl: imageUrlInput.value
        };

        const method = carId ? 'PUT' : 'POST';
        const url = carId ? `/api/cars/${carId}` : '/api/cars';

        fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        })
        .then(response => {
            if (response.ok) {
                closeModal();
                fetchCars();  
            } else {
                console.error('Error saving car:', response.statusText);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    addCarBtn.addEventListener('click', () => openModal());
    closeBtn.addEventListener('click', closeModal);
    carForm.addEventListener('submit', handleFormSubmit);

    totalCars();
    fetchCars();  // Load the car list on page load
});

