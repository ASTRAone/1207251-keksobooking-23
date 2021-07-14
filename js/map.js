// Создание главной метки
const createChapterPoint = (map, x, y) => {
  const icon = L.icon({
    iconUrl: "../img/main-pin.svg",
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const marker = L.marker(
    {
      lat: x,
      lng: y,
    },
    {
      draggable: true,
      icon,
    }
  );

  marker.addTo(map);

  marker.on("moveend", (e) => {
    const newX = e.target.getLatLng().lat.toFixed(5);
    const newY = e.target.getLatLng().lng.toFixed(5);

    document.querySelector("#address").value = `${newX}, ${newY}`;
  });
};

// Создание меток с объявлениями
const createPoints = (map, arr) => {
  arr.forEach((item) => {
    const x = item.location.lat;
    const y = item.location.lng;

    const icon = L.icon({
      iconUrl: "../img/pin.svg",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: x,
        lng: y,
      },
      {
        icon,
      }
    );

    marker.addTo(map).bindPopup(renderCard(item), {
      keepInView: true,
    });
  });
};

// Работа с картой
export const mapsChanges = (points) => {
  // Изначально делаем форму неактивной
  transferInactivePage();

  const x = 35.68304;
  const y = 139.72364;

  const map = L.map("map-canvas")
    // Если загрузилась карта, то форама становится активной
    .on("load", () => {
      transferActivePage();
      document.querySelector("#address").value = `${x}, ${y}`;
    })
    .setView(
      {
        lat: x,
        lng: y,
      },
      10
    );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  createChapterPoint(map, x, y);
  createPoints(map, points);
};
