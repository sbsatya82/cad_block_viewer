import fs from 'fs';
import path from 'path';
import Parser from 'dxf-parser';
import File from '../models/File.js';
import Block from '../models/Block.js';

export const handleUpload = async (req, res) => {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const ext = path.extname(uploadedFile.originalname).toLowerCase();
    if (!['.dxf', '.dwg'].includes(ext)) {
      return res.status(400).json({ message: 'Only DXF or DWG files are allowed.' });
    }

    // DWG not supported by dxf-parser
    if (ext === '.dwg') {
      return res.status(400).json({
        message: 'DWG files are not supported in this demo. Please upload a DXF file.',
      });
    }

    const filePath = path.resolve('uploads', uploadedFile.filename);
    const dxfContent = fs.readFileSync(filePath, 'utf-8');

    const parser = new Parser();
    const dxf = parser.parseSync(dxfContent);

    // Save file record
    const file = await File.create({ name: uploadedFile.originalname });

    const blocks = Object.values(dxf.blocks || {});
    console.log(blocks);
    for (const b of blocks) {
      if (b.entities && b.entities.length > 0) {
        const { name, entities } = b;
        const entity = entities[0];
        const blockData = {
          name,
          type: entity.type || 'UNKNOWN',
          x: entity?.position?.x || entity?.startPoint?.x || 0,
          y: entity?.position?.y || entity?.startPoint?.y || 0,
          FileId: file.id,
        };

        const createdBlock = await Block.create(blockData);
        console.log('🧱 Block saved:', createdBlock.toJSON());
      }
    }

    res.status(200).json({ message: 'File uploaded and blocks extracted.' });
  } catch (err) {
    console.error('❌ Upload Error:', err.message);
    res.status(500).json({ message: 'DXF Parsing failed. Ensure file is valid DXF.' });
  }
};
