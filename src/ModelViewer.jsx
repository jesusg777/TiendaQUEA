import { useEffect } from "react";

export default function ModelViewer() {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <model-viewer
      src="/model.glb"
      alt="Modelo 3D"
      auto-rotate
      camera-controls
      ar
      style={{ width: "100%", height: "500px" }}
    />
  );
}
