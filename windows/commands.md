# RDP using cli (xfreerdp)
```
xfreerdp /u:exampledomain\\exampleuser /p:'examplepassword' /v:<serverIP> /sec:negotiate /timeout:10000
```
# change ssh private key permissions
```
New-Variable -Name Key -Value "C:\path\to\examplekey.pem"

Icacls $Key /c /t /Inheritance:d

Icacls $Key /c /t /Grant ${env:UserName}:F

TakeOwn /F $Key

Icacls $Key /c /t /Grant:r ${env:UserName}:F

Icacls $Key /c /t /Remove:g Administrator "Authenticated Users" BUILTIN\Administrators BUILTIN Everyone System Users

Icacls $Key

Remove-Variable -Name Key
```

# check connectivity
```
Test-NetConnection -ComputerName exampleserver.exampleproject.com -Port 5432
```