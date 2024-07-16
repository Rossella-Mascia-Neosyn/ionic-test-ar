export interface IonicColors {
    color: string; // Hex color code (e.g., "#141B57")
    rgb: string; // RGB values separated by commas (e.g., "20,27,87")
    contrast: string; // Hex color code for contrasting color (e.g., "#ffffff")
    contrastRgb: string; // RGB values for contrasting color separated by commas (e.g., "255,255,255")
    shade: string; // Hex color code for a darker shade (e.g., "#12184d")
    tint: string; // Hex color code for a lighter tint (e.g., "#2c3268")
  }
  
export type BrandColors = {
    primary: IonicColors;
    secondary: IonicColors;
    tertiary: IonicColors;
}
  
export interface BrandConfig {
    logo: string; // Path to logo image (e.g., "assets/logo/logo1.png")
    colors: BrandColors;
}
  