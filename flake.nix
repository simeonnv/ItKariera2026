{
  description = "C# .NET Development Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        dotnet-sdk_9
        dotnet-aspnetcore_9
        dotnet-runtime_9
        dotnet-ef
        mono
        csharp-ls
      ];

      shellHook = ''
        export DOTNET_CLI_TELEMETRY_OPTOUT=1
        export PATH="$PATH:$HOME/.dotnet/tools"
        echo "EF Core environment ready!"
      '';
    };
  };
}
