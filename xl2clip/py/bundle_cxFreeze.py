import sys
from cx_Freeze import setup, Executable

setup(
    name = "ProgramGUI",
    version = "1",
    description = "xl2clip",
    options = 
    {
        "build_exe":
        {
            "packages": ["os", "sys"], 
            "excludes": ["tkinter"],
            "includes": ["easygui"] # <-- Include easy_gui
        }
    },
    executables = [Executable("xl2clip.pyw", base="gui")]
 )