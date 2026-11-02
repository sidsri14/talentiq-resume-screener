const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');

const mdPath = path.join(__dirname, '..', 'TECHNICAL_DESIGN_DOCUMENT.md');
const mdContent = fs.readFileSync(mdPath, 'utf8');

const lines = mdContent.split('\n');

const docChildren = [];

// Header Title
docChildren.push(
  new Paragraph({
    text: "Technical Design Document (TDD)",
    heading: HeadingLevel.TITLE,
    spacing: { after: 200 }
  }),
  new Paragraph({
    text: "AI-Powered Resume Screening & Client Shortlist Portal (TalentIQ AI)",
    heading: HeadingLevel.HEADING_1,
    spacing: { after: 200 }
  }),
  new Paragraph({
    children: [
      new TextRun({ text: "Candidate / Author: ", bold: true }),
      new TextRun("Siddharth Srivastava\n"),
      new TextRun({ text: "Target Role: ", bold: true }),
      new TextRun("Software Engineering Intern — Isocode Labs\n"),
      new TextRun({ text: "GitHub Repository: ", bold: true }),
      new TextRun("https://github.com/sidsri14/talentiq-resume-screener\n"),
      new TextRun({ text: "Architecture: ", bold: true }),
      new TextRun("Full-Stack Next.js 14 App Router, TypeScript, SQLite/In-Memory Engine, Vitest")
    ],
    spacing: { after: 400 }
  })
);

let currentParagraphChildren = [];

function flushParagraph() {
  if (currentParagraphChildren.length > 0) {
    docChildren.push(new Paragraph({
      children: currentParagraphChildren,
      spacing: { after: 140 }
    }));
    currentParagraphChildren = [];
  }
}

let inCodeBlock = false;
let codeBlockLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.startsWith('```')) {
    if (inCodeBlock) {
      // Flush code block
      flushParagraph();
      docChildren.push(new Paragraph({
        children: [
          new TextRun({
            text: codeBlockLines.join('\n'),
            font: "Courier New",
            size: 19
          })
        ],
        spacing: { before: 120, after: 120 }
      }));
      codeBlockLines = [];
      inCodeBlock = false;
    } else {
      flushParagraph();
      inCodeBlock = true;
      codeBlockLines = [];
    }
    continue;
  }

  if (inCodeBlock) {
    codeBlockLines.push(line);
    continue;
  }

  if (line.startsWith('# ')) {
    flushParagraph();
    // handled in title, or skip if duplicate
    continue;
  } else if (line.startsWith('## ')) {
    flushParagraph();
    docChildren.push(new Paragraph({
      text: line.replace('## ', '').trim(),
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 140 }
    }));
  } else if (line.startsWith('### ')) {
    flushParagraph();
    docChildren.push(new Paragraph({
      text: line.replace('### ', '').trim(),
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 180, after: 100 }
    }));
  } else if (line.startsWith('---')) {
    flushParagraph();
  } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
    flushParagraph();
    const itemText = line.trim().replace(/^[-*]\s+/, '');
    docChildren.push(new Paragraph({
      children: [
        new TextRun({ text: "• ", bold: true }),
        new TextRun(itemText.replace(/\*\*(.*?)\*\*/g, '$1'))
      ],
      indent: { left: 360 },
      spacing: { after: 80 }
    }));
  } else if (line.trim().length === 0) {
    flushParagraph();
  } else {
    // Regular text line
    if (line.includes('|')) {
      // Table line (render cleanly)
      flushParagraph();
      docChildren.push(new Paragraph({
        children: [new TextRun({ text: line, font: "Courier New", size: 18 })],
        spacing: { after: 60 }
      }));
    } else {
      const cleanLine = line.replace(/\*\*(.*?)\*\*/g, '$1');
      currentParagraphChildren.push(new TextRun(cleanLine + " "));
    }
  }
}

flushParagraph();

const doc = new Document({
  sections: [{
    properties: {},
    children: docChildren
  }]
});

Packer.toBuffer(doc).then((buffer) => {
  const outputPath = path.join(__dirname, '..', 'TECHNICAL_DESIGN_DOCUMENT.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('Successfully generated TECHNICAL_DESIGN_DOCUMENT.docx at ' + outputPath);
});
