#!/usr/bin/env ts-node

import * as fs from 'fs';
// import * as path from 'path';
import { BrandColors, BrandConfig, IonicColors } from './brandConfig';

// Get the path of the tenant JSON file from command line or specify a default value
const tenantConfigPath = process.argv[2];
const defaultConfigPath = '../config/tenant1/config.json';
const configPath = tenantConfigPath ? `../config/${tenantConfigPath}/config.json` : defaultConfigPath;

// Check if the JSON file exists
if (!fs.existsSync(configPath)) {
  console.error(`The JSON file ${configPath} does not exist.`);
  process.exit(1);
}

// Read the JSON file synchronously
const rawData = fs.readFileSync(configPath, 'utf8');
const config: BrandConfig = JSON.parse(rawData);

function generateCSS(config: BrandConfig) {
  let css = '';

  Object.keys(config.colors).forEach(key => {
    const color = config.colors[key as keyof BrandColors];
    const properties = Object.keys(color) as (keyof IonicColors)[];

    properties.forEach(prop => {
      if(prop === 'color') {
        return css += `    --ion-color-${key}: ${color[prop]};\n`
      }
      return css += `    --ion-color-${key}-${prop}: ${color[prop]};\n`;
    });
  });

  return `/* Generated from JSON configuration ${configPath} */\n\n:root {\n${css}}`;
}

// Generate CSS content
const cssContent = generateCSS(config);

// Path to save the generated CSS file
const outputPath = `../src/theme/${tenantConfigPath}.css`;

// Write content to CSS file
fs.writeFile(outputPath, cssContent, err => {
  if (err) {
    console.error('Error writing CSS file:', err);
    return;
  }
  console.log(`CSS file generated successfully: ${outputPath}`);
});