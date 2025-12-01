from plyer import notification
import time

if __name__ == "__main__":
    notification.notify(
        title='Hello!',
        message='This is a toast notification using Plyer.',
        app_name='My App',
        timeout=5
    )
    time.sleep(10) 
