export default async function (address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${address}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "myproject",
      },
    });
    const data = await res.json();
    console.log(data);
    if (!data || data.length === 0) {
      return { lat: 0, lng: 0 };
    }
    const { lat, lon } = data[0];
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  } catch (error) {
    console.log(error);
    return { lat: 0, lng: 0 };
  }
}
