type UseClipboardResult = {
  copy: (text: string) => Promise<void>;
};

/**
 * hook to copy text to clipboard
 */
export default function useClipboard(): UseClipboardResult {
  async function copy(text: string) {
    await navigator.clipboard.writeText(text);

    const event = new CustomEvent("notification", {
      detail: "copied to clipboard",
    });

    document.dispatchEvent(event);
  }

  return { copy };
}
