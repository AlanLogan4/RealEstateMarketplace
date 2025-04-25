let houses = []

export async function LoadHouses()
{
  const res = await fetch("/json/houses.json")
  const data = await res.json();
    
  houses = data
  data.forEach(house => {
    console.log(house.houseName, house.housePrice)
  });
}

function SaveHouses()
{
  console.log("not implemented yet")
}

export function GetHouses()
{
  return houses
}


