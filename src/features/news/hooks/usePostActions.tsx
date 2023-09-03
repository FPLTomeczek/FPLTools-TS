const usePostActions = () => {
  function arrayBufferToBase64(buffer: Buffer) {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  function formatDate(
    date: string,
    options?: {
      weekday?: boolean;
      year?: boolean;
      month?: boolean;
      day?: boolean;
    }
  ) {
    return new Date(date).toLocaleDateString("en-us", {
      weekday: options?.weekday === false ? undefined : "short",
      year: options?.year === false ? undefined : "numeric",
      month: options?.month === false ? undefined : "short",
      day: options?.day === false ? undefined : "2-digit",
    });
  }

  return {
    arrayBufferToBase64,
    formatDate,
  };
};

export default usePostActions;
