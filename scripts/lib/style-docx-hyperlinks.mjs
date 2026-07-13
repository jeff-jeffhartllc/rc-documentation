import { readFile, writeFile } from 'node:fs/promises'
import JSZip from 'jszip'

const HYPERLINK_STYLE = `<w:style w:type="character" w:styleId="Hyperlink"><w:name w:val="Hyperlink"/><w:basedOn w:val="DefaultParagraphFont"/><w:uiPriority w:val="99"/><w:unhideWhenUsed/><w:rPr><w:color w:val="0563C1"/><w:u w:val="single"/></w:rPr></w:style>`

const FOLLOWED_HYPERLINK_STYLE = `<w:style w:type="character" w:styleId="FollowedHyperlink"><w:name w:val="FollowedHyperlink"/><w:basedOn w:val="DefaultParagraphFont"/><w:uiPriority w:val="99"/><w:unhideWhenUsed/><w:rPr><w:color w:val="954F72"/><w:u w:val="single"/></w:rPr></w:style>`

/**
 * Apply Word's Hyperlink character style to internal TOC / hyperlink runs
 * so entries appear blue and underlined, then FollowedHyperlink after click.
 */
export async function styleDocxHyperlinks(docxPath) {
  const buf = await readFile(docxPath)
  const zip = await JSZip.loadAsync(buf)

  let documentXml = await zip.file('word/document.xml').async('string')
  documentXml = documentXml.replace(/<w:hyperlink\b[\s\S]*?<\/w:hyperlink>/g, (block) =>
    block.replace(/<w:rPr>([\s\S]*?)<\/w:rPr>/g, (_, inner) => {
      const cleaned = inner.replace(/<w:rStyle\b[^/]*\/>/g, '')
      return `<w:rPr><w:rStyle w:val="Hyperlink"/>${cleaned}</w:rPr>`
    })
  )
  zip.file('word/document.xml', documentXml)

  let stylesXml = await zip.file('word/styles.xml').async('string')
  if (!stylesXml.includes('w:styleId="Hyperlink"')) {
    stylesXml = stylesXml.replace('</w:styles>', `${HYPERLINK_STYLE}</w:styles>`)
  }
  if (!stylesXml.includes('w:styleId="FollowedHyperlink"')) {
    stylesXml = stylesXml.replace('</w:styles>', `${FOLLOWED_HYPERLINK_STYLE}</w:styles>`)
  }
  zip.file('word/styles.xml', stylesXml)

  const out = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  })
  await writeFile(docxPath, out)
}
