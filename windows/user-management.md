# Set username and password
$Username = "NewAdmin"
$Password = ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force

# Create the local user
New-LocalUser -Name $Username `
    -Password $Password `
    -FullName "New Administrator" `
    -Description "Local administrator account"

# Add the user to the local Administrators group
Add-LocalGroupMember -Group "Administrators" -Member $Username

# Verify the user
Get-LocalUser -Name $Username

# Verify group membership
Get-LocalGroupMember -Group "Administrators"
