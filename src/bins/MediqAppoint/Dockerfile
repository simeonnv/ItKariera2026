FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src/bins/MediqAppoint
COPY . ./

WORKDIR ./
RUN dotnet restore
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /out .

EXPOSE 8080

ENTRYPOINT ["dotnet", "MediqAppoint.dll"]
