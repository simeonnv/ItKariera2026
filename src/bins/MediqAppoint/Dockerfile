FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/bins/MediqAppoint/MediqAppoint.csproj", "src/bins/MediqAppoint"]
COPY ["src/libs/DbModels/DbModels.csproj", "src/libs/DbModels/"]
RUN dotnet restore "src/bins/MediqAppoint/MediqAppoint.csproj"
COPY . .
WORKDIR "/src/src/bins/MediqAppoint"
RUN dotnet build "./MediqAppoint.csproj" -c Release -o /app/build
RUN dotnet publish "./MediqAppoint.csproj" -c Release -o /out

FROM base AS final
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "MediqAppoint.dll"]
