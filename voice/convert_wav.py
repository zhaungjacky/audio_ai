import io
import wave
def convert_blob_to_wav(blob, output_file_path):
    # Read the WAV blob data
    # wav_data = blob.read()
    # wav_data = b"RIFF" + wav_data
    # .encode('utf-8').strip()
    # print(wav_data)

    # Create a new WAV file with corrected header
    with wave.open(output_file_path, 'wb') as wav_file:
        # Set the WAV file parameters based on the blob
        wav_file.setnchannels(1)  # Adjust to the number of channels (1 for mono, 2 for stereo, etc.)
        wav_file.setsampwidth(2)  # Adjust to the sample width in bytes (2 for 16-bit audio, 4 for 32-bit audio, etc.)
        wav_file.setframerate(16000)  # Adjust to the sample rate (e.g., 44100 Hz)

        # Write the corrected WAV data
        wav_file.writeframesraw(blob)

import subprocess

def ffmepg_blob_to_wav(input_blob, input_file_path,output_file_path):
    # Write the binary blob to a temporary WAV file
    with open(input_file_path, 'wb') as temp_file:
        temp_file.write(input_blob)

    # Define the FFmpeg command to copy the WAV file to the output path
    ffmpeg_command = [
        'ffmpeg',
        '-i', input_file_path,  # Input WAV file
        '-c', 'copy',           # Copy audio codec (no re-encoding)
        output_file_path         # Output WAV file path
    ]

    try:
        # Execute the FFmpeg command
        subprocess.run(ffmpeg_command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"FFmpeg error: {e}")

    # Clean up the temporary file
    # subprocess.run(['rm', input_file_path], check=True)