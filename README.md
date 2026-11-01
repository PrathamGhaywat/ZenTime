# ZenTime - The timer meant for you
ZenTime is a timer app that allows you to use a timer, todo, music player, calendar and see the time around the world efficently then ever using a calm and simple UI. The app itself is super tiny and minuscle aswell as opensource, so data never leaves your device.

## Installing
The app is built in Tauri and React using Rust and Bun, which makes it's binary small and effecient. 

### Releases
You can download the installer for your respective system under the releases pages. We provide support for most major platforms.
Alternatively you can self-compile it.

Please note that the app isn't signed for any platform so there maybe warnings shown by your OS (e.g MacOS, Windows). In that case follow these steps:
#### Windows:
When windows defender tries to warn you, you have to click on More options / the ... dots and click on run anyway. Once the installation is complete, you will be able to run the app after installation without any warnings.

#### MacOS:
ZenTime isn't signed and notarized with Apple Developer ID, so macOS Gatekeeper will prevent the application from opening and may say that this app is damaged and can't open.

> "ZenTime is damaged and can't be opened. You should move it to the Bin."

**This is a macOS security restriction and does not necessarily mean the application is damaged.**

### Installation instructions

1. Download the macOS `.dmg` file from the [GitHub Releases](https://github.com/PrathamGhaywat/zentime/releases) page.
2. Open the downloaded `.dmg` file.
3. Drag **ZenTime.app** into your Applications folder.
4. Try opening ZenTime.

### If macOS blocks the application

If macOS refuses to open ZenTime:

1. Open **System Settings**.
2. Navigate to **Privacy & Security**.
3. Scroll down to the **Security** section.
4. Look for a message indicating that ZenTime was blocked.
5. If macOS offers an **Open Anyway** option, select it.
6. Confirm your choice when prompted.
7. Try opening ZenTime again.

You may need to enter your Mac password.

**Important:** Only bypass this restriction if you downloaded ZenTime from the official [ZenTime GitHub Releases](https://github.com/PrathamGhaywat/zentime/releases) page and trust the software.

### Still having problems?

If ZenTime still displays a "damaged" message, please [open an issue](https://github.com/PrathamGhaywat/zentime/issues) with:
- Your macOS version.
- Your Mac model (e.g. MacBook Air M4).
- The exact error message or a screenshot.

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