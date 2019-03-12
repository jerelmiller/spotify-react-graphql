const copyToClipboard = (text: string) => {
  return new Promise(resolve => {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)

    textarea.value = text
    textarea.select()
    document.execCommand('copy')

    document.body.removeChild(textarea)

    resolve()
  })
}

export default copyToClipboard
