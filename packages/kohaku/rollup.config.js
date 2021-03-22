import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";

const banner = `/**
 * ${pkg.name}
 * ${pkg.description}
 * @version: ${pkg.version}
 * @author: ${pkg.author}
 * @license: ${pkg.license}
 **/
`;

export default [
  {
    input: "src/kohaku.ts",
    plugins: [
      replace({
        preventAssignment: true,
        __SORA_KOHAKU_VERSION__: pkg.version,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
    output: {
      sourcemap: false,
      file: "dist/kohaku.mjs",
      format: "module",
      name: "Kohaku",
      banner: banner,
    },
  },
];
