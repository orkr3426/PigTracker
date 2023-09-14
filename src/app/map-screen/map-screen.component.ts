import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements AfterViewInit {
  private map;
  locations: any;
  latitudes: any;
  longitudes: any;
  count: any;
  constructor(private http:HttpClient) { 
    this.locations = [];
    this.latitudes = [];
    this.longitudes = [];
    this.count = [];
  }

  ngAfterViewInit(): void {
    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamlrYXRoeWNobyIsImEiOiJjbGI4Z3g3YW8wbDFtM29wbHoxbHUzOHdzIn0.5CFnBnL95tuOGjynR30d6w', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    this.http.get<Object>("https://272.selfip.net/apps/ImOTG6acTe/collections/Reports/documents/")
    .subscribe((data:any)=>{
      for(var i = 0; i<data.length; i++) {
        if(this.locations.indexOf(data[i].data.locationName)==-1){
          this.locations.push(data[i].data.locationName);
          this.count.push(1);
          this.latitudes.push(data[i].data.latitude);
          this.longitudes.push(data[i].data.longitude);
        } else {
          for (var j = 0; j<this.locations.length; j++) {
            if (this.locations[j] == data[i].data.locationName) {
              this.count[j]++;
            }
          }
        }
      }      

      for (var i = 0; i<this.locations.length; i++) {
        var code = "<b>" + this.locations[i] +"</b><br />"+ this.count[i] +" cases reported";
        L.marker([this.latitudes[i], this.longitudes[i]]).addTo(this.map)
        .bindPopup(code);
      }
    });
  
  }

}
