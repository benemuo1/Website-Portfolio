import { useEffect, useRef, useState, Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false }; }
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) return (
      <div style={{ width: "100%", height: "100%", background: "#0a0a14", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>unavailable</span>
      </div>
    );
    return this.props.children;
  }
}

export default function LazyEffect({ component: Comp, height }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height }}>
      {visible
        ? <ErrorBoundary><Comp /></ErrorBoundary>
        : <div style={{ width: "100%", height, background: "#0a0a14", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.08)", borderTopColor: "rgba(255,255,255,0.3)", animation: "spin 1s linear infinite" }} />
          </div>
      }
    </div>
  );
}