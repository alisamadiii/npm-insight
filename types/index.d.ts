interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: {
    name: string;
  };
  license: string;
  repository: {
    type: string;
    url: string;
    directory: string;
  };
  homepage: string;
  funding: {
    type: string;
    url: string;
  };
  type: string;
  types: string;
  main: string;
  module: string;
  "react-native": string;
  exports: {
    ".": {
      import: {
        types: string;
        default: string;
      };
      require: {
        types: string;
        default: string;
      };
    };
    "./package.json": string;
  };
  sideEffects: boolean;
  dependencies: {
    "@tanstack/query-core": string;
  };
  devDependencies: {
    "@testing-library/react": string;
    "@testing-library/react-render-stream": string;
    "@types/react": string;
    "@types/react-dom": string;
    "@vitejs/plugin-react": string;
    "eslint-plugin-react-compiler": string;
    "npm-run-all": string;
    react: string;
    "react-dom": string;
    "react-error-boundary": string;
    "@tanstack/query-persist-client-core": string;
  };
  peerDependencies: {
    react: string;
  };
  scripts: {};
  _id: string;
  bugs: {
    url: string;
  };
  _integrity: string;
  _resolved: string;
  _from: string;
  _nodeVersion: string;
  _npmVersion: string;
  dist: {
    integrity: string;
    shasum: string;
    tarball: string;
    fileCount: number;
    unpackedSize: number;
    attestations: {
      url: string;
      provenance: {
        predicateType: string;
      };
    };
    signatures: Array<{
      keyid: string;
      sig: string;
    }>;
  };
  _npmUser: {
    name: string;
    email: string;
  };
  keywords: Array<string>;
  directories: {};
  maintainers: Array<{
    name: string;
    email: string;
  }>;
  _npmOperationalInternal: {
    host: string;
    tmp: string;
  };
  _hasShrinkwrap: boolean;
}
