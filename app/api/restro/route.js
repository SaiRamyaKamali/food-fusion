export async function POST(request) {

  const {preferences} = request.body;

  const apiKey = 'AIzaSyBDx0Jt2uc5577zBvhflHCmnAS-fe_y_3s';
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=${preferences.cuisine}&key=${apiKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  return new Response(JSON.stringify(data))
}
