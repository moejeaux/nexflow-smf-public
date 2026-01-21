self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/.well-known/x402-verification.json",
        "destination": "/api/.well-known/x402-verification"
      },
      {
        "source": "/.well-known/agent-manifest",
        "destination": "/api/.well-known/agent-manifest"
      },
      {
        "source": "/.well-known/agent-manifest.json",
        "destination": "/api/.well-known/agent-manifest"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()