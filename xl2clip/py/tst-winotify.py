# Source - https://stackoverflow.com/a
# Posted by Arda Kandemir
# Retrieved 2025-11-28, License - CC BY-SA 4.0

from winotify import Notification, audio

if __name__ == "__main__":
	toast = Notification(
		app_id = "Notification",
		title = "Alert",
		msg = "Text",
		duration = "long",
		icon = r"FullPath.ico"
	)

	toast.set_audio(audio.Mail, loop=False)

	toast.add_actions(label="URL Button", launch = "https://stackoverflow.com")

	toast.show()
