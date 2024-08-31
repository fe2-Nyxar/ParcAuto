{
  description = "I'm gonna touch you, ni-";

  inputs = {
    nixpkgs-stable.url = "github:nixos/nixpkgs/nixos-23.11";
  };

  outputs = { self, nixpkgs-stable, ... }: with nixpkgs-stable.legacyPackages.x86_64-linux; {
    devShells.x86_64-linux.oneessr = mkShell {
      buildInputs = [
        php83Packages.composer
        php83
        nodejs_21
      ];
    };
   };
}
