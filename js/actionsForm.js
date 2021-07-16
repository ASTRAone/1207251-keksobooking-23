const successAd = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const rejectAd = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

document.querySelector('.ad-form__submit').addEventListener('click', (e) => {
    e.preventDefault();

    const data = document.querySelector('.ad-form');
    const dataName = new FormData(data);
    
    fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataName),
        })
        .then((response) => {
            if (response.ok) {
                response
                    .json()
                    .then((data) => {
                        console.log('Успех', data)
                    })
            } else {
                console.log('ошибка')
            }
        })  
});