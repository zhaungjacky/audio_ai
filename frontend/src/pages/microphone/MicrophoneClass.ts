import axios from "axios";
import CryptoJS from "crypto-js";

export type OsTypeProps =
  | "Windows"
  | "macOS"
  | "Linux"
  | "iOS"
  | "Android"
  | "unkonwOS";

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
  pauseStatus?: boolean;
  sampleRate?: number;
  channelCount?: number;
  osType: OsTypeProps;
  // openai?: OpenAI;

  constructor() {
    this.initialized = false;
    this.audioChunks = [];
    //   const constraints: MediaStreamConstraints = {
    //     audio: true,
    // };
    const userAgent = navigator.userAgent;
    this.osType = "Windows";

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
        this.audioContext = new AudioContext(); //{ sampleRate: 16000}
        this.microphone = this.audioContext.createMediaStreamSource(stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 512;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.microphone.connect(this.analyser);
        this.initialized = true;

        this.sampleRate = this.audioContext.sampleRate;
        this.channelCount = this.microphone.channelCount;

        if (userAgent.indexOf("Win") !== -1) {
          this.osType = "Windows";
          // this.sampleRate = this.audioContext.sampleRate / 2;
        } else if (userAgent.indexOf("Android") !== -1) {
          this.osType = "Android";
          // this.sampleRate = this.audioContext.sampleRate / 2;
        } else if (userAgent.indexOf("Mac") !== -1) {
          this.osType = "macOS";
          // this.sampleRate = this.audioContext.sampleRate;
        } else if (userAgent.indexOf("Linux") !== -1) {
          this.osType = "Linux";
          // this.sampleRate = this.audioContext.sampleRate;
        } else if (
          userAgent.indexOf("iPhone") !== -1 ||
          userAgent.indexOf("iPad") !== -1
        ) {
          this.osType = "iOS";
          // this.sampleRate = this.audioContext.sampleRate;
        } else {
          this.osType = "unkonwOS";
          // this.sampleRate = this.audioContext.sampleRate / 2;
        }

        // console.log(userAgent)

        // console.log("this.sampleRate:",this.sampleRate)
        // console.log("this.channelCount:",this.channelCount)
        // console.log("this.osType:",this.osType)
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

  // function stop recording
  stopRecord() {
    if (this.audioStream) {
      this.audioStream.getTracks().forEach((track) => {
        track.stop();
      });

      // console.log(this.audioChunks);

      const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      // const urlTmp = window.URL.createObjectURL(audioBlob)
      this.audioUrl = URL.createObjectURL(audioBlob);
      // console.log(this.audioUrl);
      // blobToWav(audioBlob).then((wavBlob) => {
      //   // Use the resulting WAV Blob as needed
      //   this.audioUrl = URL.createObjectURL(wavBlob);
      //   console.log(this.audioUrl);
      //   // You can create a download link or do other actions with the WAV file.
      // });

      // this.audioUrl = window.URL.createObjectURL(audioBlob);

      return this.audioChunks;

      // let permission = navigator.permissions.query({name:"xr-spatial-tracking"})
      // permission.then(data=>console.log(data));

      // console.log(typeof(permission));
    }
  }

  saveRecord() {
    return this.audioUrl;
  }

  pauseRecord() {
    console.log(this.audioChunks);
    if (this.audioStream && this.mediaRecorder) {
      const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      // const audioBlob = new Blob(this.audioChunks, { type: 'application/octet-stream' });
      // const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      this.audioUrl = window.URL.createObjectURL(audioBlob);
      this.mediaRecorder.pause();
      this.pauseStatus = true;
      return audioBlob;
    }
  }

  restartRecord() {
    if (this.pauseStatus && this.audioStream && this.mediaRecorder) {
      this.mediaRecorder.start();
    }
  }

  async transcripeAudio() {
    if (this.audioChunks) {
      const model = "whisper-1";
      const audioFile = new Blob(this.audioChunks, {
        type: "audio/mp3",
      });

      const formData = new FormData();

      formData.append("model", model);
      formData.append("file", audioFile);

      if (formData.get("file")) {
        // console.log(formData.get("file"));
        axios
          .post("https://api.openai.com/v1/audio/transcriptions", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
          })
          .then((result) => {
            console.log("result: ", result);
            return result.data;
          })
          .catch((err) => console.log(err));
      } else {
        console.log("no data");
        return "no data";
      }
    }
  }

  iflyService() {
    const config = {
      // 请求地址
      hostUrl: "https://raasr.xfyun.cn/v2/api/upload",
      //在控制台-我的应用-语音听写（流式版）获取
      appid: "215170db",
      //在控制台-我的应用-语音听写（流式版）获取
      apiSecret: "bca2efef633d6d6199507d38747013a4",
      //在控制台-我的应用-语音听写（流式版）获取
    };

    function getAuthStr() {
      // HmacSHA1(MD5(appid + ts)，secretkey)
      const date = new Date();
      const dataChuo = Number(date).toString();
      const baseString = config.appid + dataChuo;
      const md5 = CryptoJS.MD5(baseString);
      const hmacssha1 = CryptoJS.HmacSHA1(md5, config.apiSecret);

      const signature = CryptoJS.enc.Base64.stringify(hmacssha1);

      // console.log(signature);
      return signature;
    }

    const signature = getAuthStr();

    console.log(signature);

    return signature;
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
}

export async function addWavHeader(
  audioData: Blob,
  sampleRate: number,
  numChannels: number,
  sampleWidth: number
): Promise<Blob> {
  // Calculate the total file size and data size
  const fileSize = audioData.size + 44;
  const dataSize = audioData.size;

  // Create a new ArrayBuffer for the header
  const header = new ArrayBuffer(44);
  const headerView = new DataView(header);

  // Set the RIFF identifier
  headerView.setUint8(0, "R".charCodeAt(0));
  headerView.setUint8(1, "I".charCodeAt(0));
  headerView.setUint8(2, "F".charCodeAt(0));
  headerView.setUint8(3, "F".charCodeAt(0));
  headerView.setUint32(4, fileSize, true);
  headerView.setUint8(8, "W".charCodeAt(0));
  headerView.setUint8(9, "A".charCodeAt(0));
  headerView.setUint8(10, "V".charCodeAt(0));
  headerView.setUint8(11, "E".charCodeAt(0));
  headerView.setUint8(12, "f".charCodeAt(0));
  headerView.setUint8(13, "m".charCodeAt(0));
  headerView.setUint8(14, "t".charCodeAt(0));
  headerView.setUint8(15, " ".charCodeAt(0));

  headerView.setUint32(16, 16, true); // Audio Format (PCM) ckeck

  headerView.setUint16(20, 1, true);

  // Set the number of channels
  headerView.setUint16(22, numChannels, true);

  // Set the sample rate
  headerView.setUint32(24, sampleRate, true);

  // Set the byte rate
  headerView.setUint32(28, sampleRate * numChannels * sampleWidth, true);

  // Set the block align
  headerView.setUint16(32, numChannels * sampleWidth, true);

  // Set the bits per sample
  headerView.setUint16(34, sampleWidth * 8, true);

  headerView.setUint8(36, "d".charCodeAt(0));
  headerView.setUint8(37, "a".charCodeAt(0));
  headerView.setUint8(38, "t".charCodeAt(0));
  headerView.setUint8(39, "a".charCodeAt(0));

  // Set the data size
  headerView.setUint32(40, dataSize, true);

  // // Read the binary audio data as an array buffer
  // const audioArrayBuffer = await audioData.arrayBuffer();

  // // Create a new Uint8Array for the header
  // const headerArray =  new Uint8Array(header);

  // // Combine the header and audio data into a new Uint8Array
  // const wavData = new Uint8Array(headerArray.length + audioArrayBuffer.byteLength);

  // // Copy the header and audio data into the new Uint8Array
  // wavData.set(headerArray,0);
  // wavData.set(new Uint8Array(audioArrayBuffer), headerArray.length);

  // // // Convert the Uint8Array back to a Blob
  // const wavBlob = new Blob([wavData], { type: 'audio/wav' });
  const wavBlob = new Blob([headerView, audioData], { type: "audio/wav" });

  return wavBlob;
}

/*
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
  pauseStatus?: boolean;
  sampleRate?: number;
  channelCount?: number;
  osType: OsTypeProps;
  // openai?: OpenAI;

  constructor() {
    this.initialized = false;
    this.audioChunks = [];
    //   const constraints: MediaStreamConstraints = {
    //     audio: true,
    // };
    const userAgent = navigator.userAgent;
    this.osType = "Windows";

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
        this.audioContext = new AudioContext(); //{ sampleRate: 16000}
        this.microphone = this.audioContext.createMediaStreamSource(stream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 512;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.microphone.connect(this.analyser);
        this.initialized = true;

        this.sampleRate = this.audioContext.sampleRate;
        this.channelCount = this.microphone.channelCount;

        if (userAgent.indexOf("Win") !== -1) {
          this.osType = "Windows";
          // this.sampleRate = this.audioContext.sampleRate / 2;
        } else if (userAgent.indexOf("Android") !== -1) {
          this.osType = "Android";
          // this.sampleRate = this.audioContext.sampleRate / 2;
        } else if (userAgent.indexOf("Mac") !== -1) {
          this.osType = "macOS";
          // this.sampleRate = this.audioContext.sampleRate;
        } else if (userAgent.indexOf("Linux") !== -1) {
          this.osType = "Linux";
          // this.sampleRate = this.audioContext.sampleRate;
        } else if (
          userAgent.indexOf("iPhone") !== -1 ||
          userAgent.indexOf("iPad") !== -1
        ) {
          this.osType = "iOS";
          // this.sampleRate = this.audioContext.sampleRate;
        } else {
          this.osType = "unkonwOS";
          // this.sampleRate = this.audioContext.sampleRate / 2;
        }

        // console.log(userAgent)

        // console.log("this.sampleRate:",this.sampleRate)
        // console.log("this.channelCount:",this.channelCount)
        // console.log("this.osType:",this.osType)
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

  // function stop recording
  stopRecord() {
    if (this.audioStream) {
      this.audioStream.getTracks().forEach((track) => {
        track.stop();
      });

      // console.log(this.audioChunks);

      const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      // const urlTmp = window.URL.createObjectURL(audioBlob)
      this.audioUrl = URL.createObjectURL(audioBlob);
      // console.log(this.audioUrl);
      // blobToWav(audioBlob).then((wavBlob) => {
      //   // Use the resulting WAV Blob as needed
      //   this.audioUrl = URL.createObjectURL(wavBlob);
      //   console.log(this.audioUrl);
      //   // You can create a download link or do other actions with the WAV file.
      // });

      // this.audioUrl = window.URL.createObjectURL(audioBlob);

      return this.audioChunks;

      // let permission = navigator.permissions.query({name:"xr-spatial-tracking"})
      // permission.then(data=>console.log(data));

      // console.log(typeof(permission));
    }
  }

  saveRecord() {
    return this.audioUrl;
  }

  pauseRecord() {
    console.log(this.audioChunks);
    if (this.audioStream && this.mediaRecorder) {
      const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      // const audioBlob = new Blob(this.audioChunks, { type: 'application/octet-stream' });
      // const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      this.audioUrl = window.URL.createObjectURL(audioBlob);
      this.mediaRecorder.pause();
      this.pauseStatus = true;
      return audioBlob;
    }
  }

  restartRecord() {
    if (this.pauseStatus && this.audioStream && this.mediaRecorder) {
      this.mediaRecorder.start();
    }
  }

  async transcripeAudio() {
    if (this.audioChunks) {
      const model = "whisper-1";
      const audioFile = new Blob(this.audioChunks, {
        type: "audio/mp3",
      });

      const formData = new FormData();

      formData.append("model", model);
      formData.append("file", audioFile);

      if (formData.get("file")) {
        // console.log(formData.get("file"));
        axios
          .post("https://api.openai.com/v1/audio/transcriptions", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
          })
          .then((result) => {
            console.log("result: ", result);
            return result.data;
          })
          .catch((err) => console.log(err));
      } else {
        console.log("no data");
        return "no data";
      }
    }
  }

  iflyService() {
    const config = {
      // 请求地址
      hostUrl: "https://raasr.xfyun.cn/v2/api/upload",
      //在控制台-我的应用-语音听写（流式版）获取
      appid: "215170db",
      //在控制台-我的应用-语音听写（流式版）获取
      apiSecret: "bca2efef633d6d6199507d38747013a4",
      //在控制台-我的应用-语音听写（流式版）获取
    };

    function getAuthStr() {
      // HmacSHA1(MD5(appid + ts)，secretkey)
      const date = new Date();
      const dataChuo = Number(date).toString();
      const baseString = config.appid + dataChuo;
      const md5 = CryptoJS.MD5(baseString);
      const hmacssha1 = CryptoJS.HmacSHA1(md5, config.apiSecret);

      const signature = CryptoJS.enc.Base64.stringify(hmacssha1);

      // console.log(signature);
      return signature;
    }

    const signature = getAuthStr();

    console.log(signature);

    return signature;
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
}

*/

// Example usage:
// Replace 'audioBlob' with your binary audio data blob, and provide sampleRate, numChannels, and sampleWidth.
// const sampleRate = 44100; // Sample rate in Hz
// const numChannels = 1;    // Number of audio channels (1 for mono)
// const sampleWidth = 2;    // Sample width in bytes (2 for 16-bit audio)

// const fixedWavBlob = addWavHeader(audioBlob, sampleRate, numChannels, sampleWidth);

// Now, 'fixedWavBlob' contains the valid WAV data with the RIFF header.
