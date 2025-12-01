from plyer import notification
import time
import pyexcel
import pyexcel_xls
import pyperclip
import ctypes
import sys

if __name__ == "__main__":
    if len(sys.argv) != 2 or (sys.argv[1].startswith("~") or not sys.argv[1].endswith(".xls")):
        ctypes.windll.user32.MessageBoxW(0, "Es necesario proveer un sólo archivo de excel válido (.xls)", "Error", 1)
    else:
        try:
            # Read the first sheet from the Excel file
            sheet = pyexcel.get_sheet(file_name=sys.argv[1], sheet_name=0)
            sheet_str = "\n".join(["\t".join(map(str, row)) for row in sheet.row])
            pyperclip.copy(sheet_str)

            notification.notify(
                title    = 'Listo',
                message  = 'Contenido copiado al portapapeles',
                app_name = '___',
                timeout=5
            )
        except Exception as e:
            print(e)
            ctypes.windll.user32.MessageBoxW(0, "El contenido no pudo ser copiado", "Error", 1)
        