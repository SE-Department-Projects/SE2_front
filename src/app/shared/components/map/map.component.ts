import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: 30.0444, lng: 31.2357 },
    zoom: 12,
  };

  center: google.maps.LatLngLiteral = { lat: 30.0444, lng: 31.2357 };
  zoom = 12;
  markerPositions = [
    { lat: 30.0444, lng: 31.2357 }, // Tahrir Square
    { lat: 30.0131, lng: 31.2089 }, // Cairo University
    { lat: 30.0487, lng: 31.2336 }, // Egyptian Museum
    { lat: 30.0299, lng: 31.2618 }, // Al-Azhar Mosque
    { lat: 30.0136, lng: 31.2272 }, // Cairo Opera House
    { lat: 29.9792, lng: 31.1342 }, // Great Sphinx of Giza
    { lat: 30.0561, lng: 31.2394 }, // Abdeen Palace
    { lat: 30.0617, lng: 31.2443 }, // Khan El-Khalili Bazaar
    { lat: 29.9753, lng: 31.1376 }, // Giza Pyramids
    { lat: 30.0521, lng: 31.2626 }, // Salah El-Din Citadel
  ];
}
