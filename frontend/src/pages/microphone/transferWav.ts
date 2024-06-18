//not work


export async function blobToWav(blob: Blob): Promise<Blob> {
    // Create an AudioContext
    const audioContext = new AudioContext();
  
    // Read the Blob data as an ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();
  
    // Decode the PCM audio data from the ArrayBuffer
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
    // Create a new AudioBuffer with the desired settings
    const newAudioBuffer = audioContext.createBuffer(1, audioBuffer.length, 16000);
  
    // Copy the channel data to the new AudioBuffer
    newAudioBuffer.copyToChannel(audioBuffer.getChannelData(0), 0);
  
    // Create a WAV file from the AudioBuffer
    const wavBlob = await audioBufferToWav(newAudioBuffer);
  
    return wavBlob;
  }
  
  // Function to convert an AudioBuffer to a WAV Blob
  function audioBufferToWav(audioBuffer: AudioBuffer): Promise<Blob> {
    return new Promise((resolve) => {
      const interleaved = interleave(audioBuffer);
      const buffer = new ArrayBuffer(44 + interleaved.length * 2);
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
      view.setUint16(22, 1, true);
      // sample rate
      view.setUint32(24, 16000, true);
      // byte rate (sample rate * block align)
      view.setUint32(28, 16000 * 2, true);
      // block align (channel count * bytes per sample)
      view.setUint16(32, 2, true);
      // bits per sample
      view.setUint16(34, 16, true);
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
  
  // Helper function to interleave audio data
  export function interleave(audioBuffer: AudioBuffer): Float32Array {
    const numChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numChannels;
    const result = new Float32Array(length);
    const channelData = new Array(numChannels);
  
    for (let i = 0; i < numChannels; i++) {
      channelData[i] = audioBuffer.getChannelData(i);
    }
  
    for (let i = 0; i < length; i += numChannels) {
      for (let channel = 0; channel < numChannels; channel++) {
        result[i + channel] = channelData[channel][Math.floor(i / numChannels)];
      }
    }
  
    return result;
  }
  
  // Helper function to write a string to a DataView
  export function writeString(view: DataView, offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }
  
  // Helper function to convert 32-bit float to 16-bit PCM
  export function floatTo16BitPCM(output: DataView, offset: number, input: Float32Array) {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }
  