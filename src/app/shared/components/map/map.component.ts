import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { RobotsService } from 'src/app/core/services/robots.service';
import { WebSocketService } from 'src/app/core/services/web-socket.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: 30.0444, lng: 31.2357 },
    zoom: 11,
  };
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  robots: any[] = [];
  humans: any[] = [];
  obstacles: any[] = [];

  robotCount = 0;
  humanCount = 0;
  obstacleCount = 0;

  private buzzerSound: HTMLAudioElement;

  constructor(
    private _RobotsService: RobotsService,
    private _HttpClient: HttpClient,
    private _WebSocketService: WebSocketService
  ) {
    this.buzzerSound = new Audio('./assets/buzzer1.mp3');
  }

  ngOnInit(): void {
    this.getAllRobots();
    this.getDetections();
    this.listenForWebSocketUpdates();
  }

  createImgTag(src: string): HTMLImageElement {
    const imgTag = document.createElement('img');
    imgTag.src = src;
    imgTag.style.width = '40px';
    imgTag.style.height = '40px';
    imgTag.style.objectFit = 'contain';
    return imgTag;
  }

  getAllRobots(): void {
    this._RobotsService.getAllRobots().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.robots = response.data.robots;
          this.robotCount = this.robots.length;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDetections(): void {
    this._RobotsService.getDetections().subscribe({
      next: (response) => {
        const detections: any[] = response.data.detections;

        detections.forEach((detection) => {
          if (detection.detectionType === 'humanDetection') {
            this.humans.push(detection);
          } else if (detection.detectionType === 'obstacleDetection') {
            this.obstacles.push(detection);
          }
        });

        this.updateCounts();
      },
      error: (err) => {
        console.error('Error fetching detections:', err);
      },
    });
  }

  onMarkerClick(marker: MapAdvancedMarker, id: number) {
    this.infoWindow.openAdvancedMarkerElement(
      marker.advancedMarker,
      `ID: ${id.toString()}`
    );
  }

  async getLocationName(lat: number, lon: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    try {
      const response: any = await this._HttpClient.get(url).toPromise();
      return response.display_name || 'Unknown location';
    } catch (err) {
      console.error('Error fetching location:', err);
      return 'Failed to fetch location';
    }
  }

  listenForWebSocketUpdates(): void {
    this._WebSocketService.messages.subscribe((message: any) => {
      const { type, fullDocument } = message;

      if (message.collection === 'detections') {
        if (type === 'insert') {
          if (fullDocument.detectionType === 'humanDetection') {
            this.humans.push(fullDocument);
          } else if (fullDocument.detectionType === 'obstacleDetection') {
            this.obstacles.push(fullDocument);
          }
          this.playBuzzerSound();
        } else if (type === 'delete') {
          const idToDelete = message.key;
          this.humans = this.humans.filter((human) => human.id !== idToDelete);
          this.obstacles = this.obstacles.filter(
            (obstacle) => obstacle.id !== idToDelete
          );
        }
        this.updateCounts();
      }
    });
  }

  playBuzzerSound(): void {
    this.buzzerSound.currentTime = 0;
    this.buzzerSound.play().catch((err) => {
      console.error('Error playing buzzer sound:', err);
    });
  }

  updateCounts(): void {
    this.robotCount = this.robots.length;
    this.humanCount = this.humans.length;
    this.obstacleCount = this.obstacles.length;
  }
}
