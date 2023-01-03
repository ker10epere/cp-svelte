export async function CopyToClipboard(text: string) {
    await navigator.clipboard.writeText(text)
}