# =============================================================================
# ✅ FINAL Multi-stage Dockerfile for MediqAppoint (no .sln needed)
# Place this at: src/bins/MediqAppoint/Dockerfile
# =============================================================================

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# 1. Copy only csproj files first (excellent caching)
COPY src/libs/DbModels/DbModels.csproj src/libs/DbModels/
COPY src/bins/MediqAppoint/MediqAppoint.csproj src/bins/MediqAppoint/

# Restore (DbModels is referenced from MediqAppoint.csproj)
RUN dotnet restore src/bins/MediqAppoint/MediqAppoint.csproj

# 2. Copy ALL source code (THIS WAS THE BUG — now fixed)
COPY src/ .          

# 3. Publish
WORKDIR /src/bins/MediqAppoint
RUN dotnet publish

# =============================================================================
# Runtime stage (small & secure)
# =============================================================================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime


COPY --from=build /src/bins/MediqAppoint/bin/Release/net9.0/ .



EXPOSE 8080



ENTRYPOINT ["dotnet", "MediqAppoint.dll"]