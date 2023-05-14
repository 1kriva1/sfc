Write-Host "Start Identity service"

invoke-expression 'cmd /c start powershell -Command { 
    write-host "Start Identity service!"; 
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Identity\src\API\SFC.Identity.Api"; 
    dotnet run  --urls=https://localhost:7266/
}'

Write-Host "Start Angular application"

npm start

Write-Host "Process finished!"