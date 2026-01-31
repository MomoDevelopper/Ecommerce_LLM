import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autoriser les requêtes cross-origin en développement depuis le réseau local
  // Cela évite le warning sur les requêtes cross-origin
  allowedDevOrigins: ["192.168.142.1"],
  
  // Note: Le warning sur les lockfiles multiples est non-critique
  // Il apparaît car il y a un package-lock.json dans le répertoire parent (C:\Users\Ce pc\)
  // Le build et le dev server fonctionnent correctement malgré ce warning
};

export default nextConfig;
