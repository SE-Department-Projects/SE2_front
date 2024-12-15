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
    // this.moveRobot();
  }

  moveRobot(): void {
    setInterval(() => {
      this.getRobotLocations();
    }, 5000);
  }

  getRobotLocations(): void {
    this._RobotsService.getAllRobots().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          const updatedRobots = response.data.robots;

          updatedRobots.forEach((updatedRobot: any) => {
            const existingRobot = this.robots.find(
              (robot) => robot._id === updatedRobot._id
            );
            if (existingRobot) {
              existingRobot.location = updatedRobot.location; // Update only the location field
            }
          });

          console.log('Updated robot locations:', this.robots);
        }
      },
      error: (err) => {
        console.error('Error fetching robot locations:', err);
      },
    });
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
            this.humanCount = this.humans.length;
          } else if (detection.detectionType === 'obstacleDetection') {
            this.obstacles.push(detection);
            this.obstacleCount = this.obstacles.length;
          }
        });
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
            this.humanCount = message.redisValues.humanDetectionsCount;
          } else if (fullDocument.detectionType === 'obstacleDetection') {
            this.obstacles.push(fullDocument);
            this.obstacleCount = message.redisValues.obstacleDetectionsCount;
          }
          this.playBuzzerSound();
        } else if (type === 'delete') {
          const idToDelete = message.key;
          this.humans = this.humans.filter((human) => human.id !== idToDelete);
          this.obstacles = this.obstacles.filter(
            (obstacle) => obstacle.id !== idToDelete
          );
          this.humanCount = this.humans.length;
          this.obstacleCount = this.obstacles.length;
        }
      } else if (message.collection === 'robots') {
        if (type === 'insert') {
          this.robots.push(fullDocument);
          this.robotCount = message.redisValues.robotsCount;
        } else if (type === 'delete') {
          const idToDelete = message.key;
          this.robots = this.robots.filter((robot) => robot._id !== idToDelete);
          this.robotCount = message.redisValues.robotsCount;
        }
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
