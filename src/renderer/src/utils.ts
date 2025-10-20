export function sanitizeAndProcessHTML(htmlString: string): string {
  // 1. 使用DOMParser解析HTML，避免直接操作innerHTML
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // 2. 获取所有a标签
  const links = doc.querySelectorAll('a')

  links.forEach((link) => {
    // 3. 添加安全属性
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener noreferrer') // 防止安全漏洞

    // 4. 清理危险属性
    Array.from(link.attributes).forEach((attr) => {
      const attrName = attr.name.toLowerCase()
      const attrValue = attr.value.toLowerCase()

      // 移除事件处理器
      if (attrName.startsWith('on')) {
        link.removeAttribute(attrName)
      }

      // 移除危险的href值
      if (
        attrName === 'href' &&
        (attrValue.startsWith('javascript:') ||
          attrValue.startsWith('vbscript:') ||
          attrValue.startsWith('data:'))
      ) {
        link.setAttribute('href', '#')
      }
    })
  })

  // 5. 返回处理后的HTML
  return doc.body.innerHTML
}
