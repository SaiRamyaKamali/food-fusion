
import { NextResponse } from "next/server";

export async function POST(request) {

  const preferences = await request.json();

  // const {preferences} = await request.body.JSON();
  const locationApiKey = 'AIzaSyDpyTvBfWLYTRIR7BlWqt9fo_Px10IpAsU'
  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${preferences.location1}&key=${locationApiKey}`;
  const geocodingResponse = await fetch(geocodingApiUrl);
  const geocodingData = await geocodingResponse.json();
  const location = geocodingData.results[0].geometry.location;
  // var lati = "";
  // var long = "";
  // navigator.geolocation.getCurrentPosition(position => {
  // setLati(position.coords.latitude);
  // setLong(position.coords.longitude);
  // });
  // console.log(lati);
  // console.log(long);
  


  const apiKey = 'AIzaSyBDx0Jt2uc5577zBvhflHCmnAS-fe_y_3s';
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=1500&type=restaurant&keyword=${preferences.cuisine1},${preferences.cuisine2}&key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return NextResponse.json({ results: data.results })
}
