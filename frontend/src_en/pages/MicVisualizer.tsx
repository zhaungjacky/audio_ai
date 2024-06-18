import React from "react";
import { Microphone } from "./MicrophoneClass";

interface MicInterface {
  microphone: Microphone | null;
}

const MicVisualizer = (props: MicInterface) => {
  const { microphone } = props || new Microphone();
  // const [bars,setBars] = React.useState<Bar[]>()

  const main = React.useCallback(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const boxWidth = 260;
    canvas.width = boxWidth;
    canvas.height = 150;

    class Bar {
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
      ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
      }
      update(micInput: number) {
        // this.height = micInput!;
        this.height = micInput * 2000;
      }

      darw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
      }
    }

    let bars: Bar[] = [];
    function createBars() {
      for (let i = 0; i < 256; i++) {
        // let color = `hsl(${i / 2},100%,50%)`;
        bars.push(new Bar((i * boxWidth) / 256, 90, 0.8, 20, "white"));
      }
    }

    createBars();

    function animate() {
      if (microphone!.initialized) {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        const samples = microphone!.getSamples();
        bars.forEach((bar,i) => {
          if (ctx && samples) {
            bar.update(samples[i]);
            bar.darw(ctx);
          }
        });
      }
      //generate audio samples from microphone
      //animate bars base on microphone data
      requestAnimationFrame(animate);
    }

    animate();
  }, [microphone]);

  React.useEffect(() => {
    if (navigator.mediaDevices) {
      main();
    }
  }, [main]);

  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default MicVisualizer;
