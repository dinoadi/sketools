import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background:
            "radial-gradient(circle at 20% 20%, #22d3ee 0%, transparent 45%), radial-gradient(circle at 80% 10%, #818cf8 0%, transparent 40%), linear-gradient(145deg, #0f172a 0%, #111827 45%, #0b1220 100%)",
          color: "#f8fafc",
          fontWeight: 800,
          fontSize: 36,
          letterSpacing: "-1px",
          border: "2px solid rgba(255,255,255,0.14)",
          boxShadow: "inset 0 0 20px rgba(56,189,248,0.25)",
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}

