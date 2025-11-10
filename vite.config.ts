import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ViteImageOptimizer({}),
    imagetools(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    mkcert(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/models": path.resolve(__dirname, "./src/models"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  assetsInclude: ["**/*.svg"],
});

// const DEFAULT_IMG_OPTIONS = {
//   logStats: true,
//   ansiColors: true,
//   test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
//   exclude: undefined,
//   include: undefined,
//   includePublic: true,
//   svg: {
//     multipass: true,
//     plugins: [
//       {
//         name: 'preset-default',
//         params: {
//           overrides: {
//             cleanupNumericValues: false,
//             cleanupIds: {
//               minify: false,
//               remove: false,
//             },
//             convertPathData: false,
//           },
//         },
//       },
//       'sortAttrs',
//       {
//         name: 'addAttributesToSVGElement',
//         params: {
//           attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
//         },
//       },
//     ],
//   },
//   png: {
//     // https://sharp.pixelplumbing.com/api-output#png
//     quality: 100,
//   },
//   jpeg: {
//     // https://sharp.pixelplumbing.com/api-output#jpeg
//     quality: 100,
//   },
//   jpg: {
//     // https://sharp.pixelplumbing.com/api-output#jpeg
//     quality: 100,
//   },
//   tiff: {
//     // https://sharp.pixelplumbing.com/api-output#tiff
//     quality: 100,
//   },
//   // gif does not support lossless compression
//   // https://sharp.pixelplumbing.com/api-output#gif
//   gif: {},
//   webp: {
//     // https://sharp.pixelplumbing.com/api-output#webp
//     lossless: true,
//   },
//   avif: {
//     // https://sharp.pixelplumbing.com/api-output#avif
//     lossless: true,
//   },
//   cache: false,
//   cacheLocation: undefined,
// };
