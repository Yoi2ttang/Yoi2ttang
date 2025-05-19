export interface WebViewContextData {
  sendMessage: ((type: string, data: any) => void) | null
}
