import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // instant jump to top on every route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
