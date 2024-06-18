export class Microphone {
  initialized: boolean;
  audioContext?: AudioContext;
  microphone?: MediaStreamAudioSourceNode;
  analyser?: AnalyserNode;
  dataArray?: Uint8Array;

  audioStream?: MediaStream;
  mediaRecorder?: MediaRecorder;
  audioChunks: Blob[];
  audioUrl?: string;

  constructor() {
    this.initialized = false;
    this.audioChunks = [];
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            this.audioChunks.push(e.data);
          }
        };
        this.mediaRecorder.start();

        this.audioStream = stream;
        this.audioContext = new AudioContext();
        this.microphone = this.audioContext.createMediaStreamSource(stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 512;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.microphone.connect(this.analyser);
        this.initialized = true;
      })
      .catch((err) => alert(err));
  }

  getSamples() {
    if (this.dataArray && this.dataArray.length > 0) {
      this.analyser?.getByteTimeDomainData(this.dataArray);
      let normSamples = Array.from(this.dataArray).map((e) => e / 128 - 1);
      return normSamples;
    } else {
      return null;
    }
  }

  getVolume() {
    if (this.dataArray && this.dataArray.length > 0) {
      this.analyser?.getByteTimeDomainData(this.dataArray);
      let normSamples = Array.from(this.dataArray).map((e) => e / 128 - 1);
      let sum = 0;

      for (let val of normSamples) {
        sum += Math.pow(val, 2);
      }

      let volume = Math.sqrt(sum / normSamples.length);
      return volume;
    } else {
      return 0;
    }
  }

  // startRecord() {
  //   console.log(this.audioStream);
  //   if (this.audioStream?.active) {
  //     const audioRecord = new MediaRecorder(this.audioStream);
  //     audioRecord.ondataavailable = (e) => {
  //       if (e.data.size > 0) {
  //         console.log(e.data);
  //         this.audioChunks?.push(e.data);
  //       }
  //     };

  //     audioRecord.start();
  //   } else {
  //     alert("mic unavailable!");
  //   }
  // }

  stopRecord() {
    if (this.audioStream) {
      this.audioStream.getTracks().forEach((track) => {
        track.stop();
      });
        const audioBlob = new Blob(this.audioChunks, { type: "audio/mp3" });
        this.audioUrl = window.URL.createObjectURL(audioBlob);
        console.log("stop recording", this.audioUrl);
        if(this.mediaRecorder?.stop){
          this.mediaRecorder.stop();
        }
    }

  }

  saveRecord() {
    return this.audioUrl;
  }
}
