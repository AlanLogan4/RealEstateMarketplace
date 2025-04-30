







// Swap the main image when a thumbnail is clicked
const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumbnail');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    // Update main image src
    const largeSrc = thumb.getAttribute('src');
    const mainImageSrc = mainImage.getAttribute('src');
    mainImage.src = largeSrc;
    thumb.src = mainImageSrc;

    // Toggle active class
    document.querySelector('.thumbnail.active')
            .classList.remove('active');
    thumb.classList.add('active');
  });
});


  
async function  main()
{
    // Get the current URL
    var currentUrl = window.location.href;

    // Extract the ID from the URL using regex
    var id = currentUrl.match(/id=(\d+)/)[1];

    // Use the ID to fetch data from the API
    fetch('https://api.example.com/house/' + id)
        .then(response => response.json())
        .then(data => {
            // Populate the HTML with the fetched data
            document.getElementById('mainImage').src = data.mainImage;
            document.getElementById('title').innerText = data.title;
            document.getElementById('description').innerText = data.description;
            document.getElementById('price').innerText = '$' + data.price;
        })
        .catch(error => console.error('Error fetching data:', error));
}