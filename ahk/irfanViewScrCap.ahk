*~$printscreen::
SetTitleMatchMode, 2
screenshots=%a_desktop%\SCREENSHOTS
ifnotexist,%screenshots%
  filecreatedir,%screenshots%
irfan      =C:\Setups\64\IrfanView\i_view64.exe
ifexist,%irfan%
    {
   runwait, "%irfan%" "/capture=0 /convert=%screenshots%\%A_now%_screenshot.png"
   ;runwait, "%irfan%" "/capture=0 /convert=%screenshots%\%A_now%_screenshot.bmp"
   run,%screenshots%
   return
    }
return

/*
https://www.irfanview.com/

--- capture values:
0 = whole screen
1 = current monitor, where mouse is located
2 = foreground window
3 = foreground window - client area
4 = rectangle selection
5 = object selected with the mouse
6 = start in capture mode (can't be combined with other commandline options)

--- Advanced examples:
i_view32.exe /capture=2 /convert=c:\test.jpg
Capture foreground window and save result as file.

i_view32.exe /capture=2 /convert=c:\capture_$U(%d%m%Y_%H%M%S).jpg
Capture foreground window and save result as file; the file name contains time stamp.
*/
