Write-Host "Start Identity service"

invoke-expression 'cmd /c start powershell -Command { 
    write-host "Start Identity service!"; 
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Identity\src\API\SFC.Identity.Api"; 
    dotnet run  --urls=https://localhost:7266/
}'

Write-Host "Start Players service"

invoke-expression 'cmd /c start powershell -Command { 
    write-host "Start Players service!"; 
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Players\src\API\SFC.Players.Api"; 
    dotnet run  --urls=https://localhost:7366/
}'

Write-Host "Start Data service"

invoke-expression 'cmd /c start powershell -Command { 
    write-host "Start Data service!"; 
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Data\src\API\SFC.Data.Api"; 
    dotnet run  --urls=https://localhost:7466/
}'

Write-Host "Start Application"

npm start

Write-Host "Process finished!"