import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { Circle } from "../shapes/circle";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild("canvas", { static: false }) canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  constructor() {}

  ngOnInit() {
    new Circle(30, "#000");
  }
  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext(
      "2d"
    );
    this.render();
    this.context.fillStyle = "black";

    this.context.fillRect(600, 100, 100, 100);
    this.renderHtmlElement("<p>hi!</p>", {
      width: 100,
      height: 100,
      coords: { x: 100, y: 100 }
    });
    this.renderHtmlElement("<p>hi!</p>");
  }

  renderHtmlElement(
    html: string,
    options = { width: 200, height: 200, coords: { x: 200, y: 200 } }
  ) {
    var data = `<svg xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}">
  <foreignObject width="100%" height="100%">
  <div xmlns="http://www.w3.org/1999/xhtml" >
${html}  </div>
  </foreignObject>
  </svg>`;

    var img = new Image();
    var svg = new Blob([data], {
      type: "image/svg+xml;charset=utf-8"
    });
    var url = URL.createObjectURL(svg);

    img.onload = () => {
      this.context.drawImage(img, options.coords.x, 600 - options.coords.y);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  }
  render() {
    let last = new Date().getTime();
    let x = 10;
    let y = 100;
    let i = 0;
    const draw = () => {
      let now = new Date().getTime();
      let fps = now - last;
      if (i % 10 === 0) {
        console.log(i, fps);
      }
      i++;
      if (i > 1000) return;
      this.context.fillRect(500, 500, 100, 100);

      this.context.beginPath();

      x += 2;
      this.context.fillStyle = "rgba(255,255,255,1)";
      this.context.fillRect(0, 0, 800, 600);

      this.context.arc(x, y, 20, 0, 2 * Math.PI);
      this.context.fillStyle = "rgba(250,0,0,1)";
      this.context.fill();

      requestAnimationFrame(draw);
      //  this.context.clearRect(0, 0, 800, 600);
    };
    draw();
  }
}
