# ZenTime - The timer meant for you
ZenTime is a timer app that allows you to track and use focus modes efficently then ever using a calm and simple UI. The app itself is super tiny and minuscle aswell as opensource, so data never leaves your device.

## Installing
The app is built in Tauri and React using Rust and Bun, which makes it's binary small and effecient. 

### Releases
You can download the installer for your respective system under the releases pages. We provide support for most major platforms.
Alternatively you can self-compile it.

Please note that the app isn't signed for any platform so there maybe warnings shown by your OS (e.g MacOS, Windows). In that case follow these steps:
#### Windows:
When windows defender tries to warn you, you have to click on More options / the ... dots and click on run anyway. Once the installation is complete, you will be able to run the app after installation without any warnings.

#### MacOS:
Please search yourself how to eliminate the warnings or any blockades.

### Self-compilation
Requirements:
- Rust
- Bun (other JS runtimes may work but aren't supported)

1. Clone the repo: `git clone https://github.com/PrathamGhaywat/zentime.git`
2. Install the dependencies (open your folder in the terminal): `bun install`
3. Build the app: `bun tauri build`

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contributing
You can contribute by opening an issue (feature suggestions, bugs, general improvements). Pull Requests are not accepted at the moment due to the early stage of the project.

## Contact
Join me on my discord server: [Invite Link](https://discord.gg/5kAzqwvfA)