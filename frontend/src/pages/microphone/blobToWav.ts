import { floatTo16BitPCM, interleave, writeString } from "./transferWav";

export async function newBlobToWav(blob: Blob,sampleChannel:number,sampleRate:number,bitDepth:number):Promise<Blob>{

    const audioContext = new AudioContext();  
    // Read the Blob data as an ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();  
    // Decode the PCM audio data from the ArrayBuffer
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // const sampleWidth = await getWavSampleWidth(blob);
    // console.log(sampleWidth);


    return new Promise((resolve) => {
        const interleaved = interleave(audioBuffer);
        const buffer = new ArrayBuffer(44 + interleaved.length * 2);
        // const buffer = new ArrayBuffer(44 + interleaved.length * 2);
        const view = new DataView(buffer);
    
        // RIFF identifier 'RIFF'
        writeString(view, 0, 'RIFF');
        // file length minus RIFF identifier length and file description length
        view.setUint32(4, 32 + interleaved.length * 2, true);
        // RIFF type 'WAVE'
        writeString(view, 8, 'WAVE');
        // format chunk identifier 'fmt '
        writeString(view, 12, 'fmt ');

        // format chunk length
        view.setUint32(16, 16, true);
        // sample format (1 for PCM)
        view.setUint16(20, 1, true);

        // channel count (1 for mono)
        view.setUint16(22, sampleChannel, true);

        // sample rate
        view.setUint32(24, sampleRate / 2 , true);

        // byte rate (sample rate * block align)
        view.setUint32(28, sampleRate  * sampleChannel * bitDepth, true);

        // block align (channel count * bytes per sample)
        view.setUint16(32, bitDepth  * sampleChannel, true);

        // bits per sample
        view.setUint16(34, 8 * bitDepth , true);
        
        // data chunk identifier 'data'
        writeString(view, 36, 'data');

        // data chunk length
        view.setUint32(40, interleaved.length * 2, true);
    
        // Write the PCM samples
        floatTo16BitPCM(view, 44, interleaved);
    
        const wavBlob = new Blob([view], { type: 'audio/wav' });
        resolve(wavBlob);
      });
}

export async function getWavSampleWidth(blob: Blob): Promise<number | null> {
  try {
    const buffer = await blob.arrayBuffer();
    const view = new DataView(buffer);

    // Check if it's a valid WAV file
    if (view.getUint32(0, true) !== 0x52494646) {
      throw new Error('Not a valid WAV file');
    }

    // Read the sample width (bits per sample)
    const formatTag = view.getUint16(20, true);
    const sampleWidth = view.getUint16(34, true);

    if (formatTag === 1) {
      return sampleWidth;
    } else {
      throw new Error('Not a PCM WAV file');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}


      /*
      Add a valid RIFF header to the audioBlob
      const header = new DataView(new ArrayBuffer(44));
      // Add a valid RIFF header to the audioBlob
      const header = new DataView(new ArrayBuffer(44));
      header.setUint8(0, 'R'.charCodeAt(0));
      header.setUint8(1, 'I'.charCodeAt(0));
      header.setUint8(2, 'F'.charCodeAt(0));
      header.setUint8(3, 'F'.charCodeAt(0));
      header.setUint32(4, audioBlob.size + 36, true);
      header.setUint8(8, 'W'.charCodeAt(0));
      header.setUint8(9, 'A'.charCodeAt(0));
      header.setUint8(10, 'V'.charCodeAt(0));
      header.setUint8(11, 'E'.charCodeAt(0));
      header.setUint8(12, 'f'.charCodeAt(0));
      header.setUint8(13, 'm'.charCodeAt(0));
      header.setUint8(14, 't'.charCodeAt(0));
      header.setUint8(15, ' '.charCodeAt(0));
      header.setUint32(16, 16, true);  // Audio Format (PCM)
      header.setUint16(20, 1, true);   // Number of Channels (Mono)

      header.setUint16(22, 1, true);

      header.setUint32(24, 16000, true);

      header.setUint32(28, 16000 * 1 * 2, true);  // Byte Rate (Sample Rate * Number of Channels * Bits per Sample / 8)
      header.setUint16(32, 1 * 2, true);  // Block Align (Number of Channels * Bits per Sample / 8)
      header.setUint16(34, 2 * 8, true);  // Bits per Sample (16-bit)
      header.setUint8(36, 'd'.charCodeAt(0));
      header.setUint8(37, 'a'.charCodeAt(0));
      header.setUint8(38, 't'.charCodeAt(0));
      header.setUint8(39, 'a'.charCodeAt(0));
      header.setUint32(40, audioBlob.size, true);

*/