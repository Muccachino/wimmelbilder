import useMousePosition from "./useMousePosition";


export default function Cursor() {
  const { clientX, clientY } = useMousePosition();
  
  return (
    <div 
      style={{ 
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none"
      }}
    >
      <svg
        width={60}
        height={60}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          left: clientX,
          top: clientY,
          transform: "translate(-50%, -50%)",
          border: "2px solid green",
          borderRadius: "5000px"
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="30"
          fill="black"
          opacity={0.3}
        />
      </svg>
    </div>
  );
}