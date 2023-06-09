import sys
sys.path.append('../bark')  # nopep8

from IPython.display import Audio
import json
import subprocess
import os
from scipy.io.wavfile import write as write_wav
from bark import SAMPLE_RATE, generate_audio, preload_models

os.environ["SUNO_OFFLOAD_CPU"] = "True"
os.environ["SUNO_USE_SMALL_MODELS"] = "True"

# os.environ["XDG_CACHE_HOME"] = os.path.join(
#     os.path.dirname(__file__), "../../../.cache")

with open(os.path.join(
    os.path.dirname(__file__), "../../config/suno-bark.config.json")
) as config_file:
    config = json.load(config_file)


preload_models()


def say(
    phrase=config["default_prompts"]["text"],
    voice=config["default_prompts"]["voice"],
    temperature=config["default_prompts"]["voice"]
):
    print(f"Saying {phrase} ...")

    audio_array = generate_audio(phrase, voice, temperature)

    write_wav("output.wav", SAMPLE_RATE, audio_array)
    subprocess.run(["mplayer", "output.wav"])

    # Converting to Telegram's native voice message format
    # subprocess.run(["ffmpeg", "-y", "-i", "output.wav", "-c:a",
    #                "libopus", "-b:a", "160k", "output.ogg"])


if len(sys.argv) > 1:
    say(sys.argv[1], sys.argv[2], sys.argv[3])
else:
    say()
