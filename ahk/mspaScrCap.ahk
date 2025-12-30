;- Captura de pantalla 
;- https://www.autohotkey.com/boards/viewtopic.php?f=40&t=86387

~$printscreen::
Run, mspaint.exe, c:\windows\system32, max, PID
WinWait, ahk_pid %PID%
WinSet, Top ,, ahk_pid %PID%
Send ^v
Send ^s
Sleep, 500
Send {Enter}
Sleep, 200
WinClose, ahk_pid %PID%
return