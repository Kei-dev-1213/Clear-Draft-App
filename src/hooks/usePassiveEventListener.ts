import { useEffect } from "react";

const usePassiveEventListener = (eventName: string, handler: EventListener, element: EventTarget = window) => {
  useEffect(() => {
    const options: AddEventListenerOptions = { passive: true };
    element.addEventListener(eventName, handler, options);

    return () => {
      element.removeEventListener(eventName, handler);
    };
  }, [eventName, handler, element]);
};

export default usePassiveEventListener;