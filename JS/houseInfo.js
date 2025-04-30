







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


  
async function main()
{
    // Get the current URL
    var currentUrl = window.location.href;

    // Extract the ID from the URL using regex
    var id = currentUrl.match(/id=(\d+)/)[1];

    // Use the ID to fetch data from the API
    const house = await GetHouseInfo(id)



}



function DisplayHouseInfo(house) {
    // Populate the HTML with the fetched data
    document.getElementById('mainImage').src = house.mainImage;
    document.getElementById('title').innerText = house.title;
    document.getElementById('description').innerText = house.description;
    document.getElementById('price').innerText = '$' + house.price;
}
async function GetHouseInfo(id) {
    // Use the ID to fetch data from the API
    fetch('https://localhost:5139/api/properties/get/' + id)
        .then(response => response.json())
        .then(data => {
            // Assuming the API returns an object with the house data
            const house = {
              Realtor: data.RealtorID,
              Location: data.Address,
              PropertySize: data.PropertySize,
              NumberofRooms: data.NumberOfRooms,
              year: data.Year,
              NumberofBathrooms: data.NumberOfBathrooms,
              Price: data.price,
              Description: data.Description,
              MainImage: data.CoverImage,
              Propertytype: data.PropertyType,
              Images: PropertyImages.map(image => image.url), // Assuming images is an array of objects with a url property

            };
            DisplayHouseInfo(house);
        })

        .catch(error => console.error('Error fetching data:', error));
}