# list users985
Get-LocalUser

# change password
Set-LocalUser -Name [username] -Password (ConvertTo-SecureString -AsPlainText ‘newpassword’ -Force)
