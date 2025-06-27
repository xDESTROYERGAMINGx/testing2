const excelFileUrl = 'OFWELITES2.xlsx';

async function loadExcelData() {
  try {
    const response = await fetch(excelFileUrl);
    if (!response.ok) throw new Error(`Failed to fetch Excel file at ${excelFileUrl}`);

    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    // Parse workbook
    const workbook = XLSX.read(data, { type: 'array' });

    // Find the "STATS" sheet (case-insensitive)
    const statsSheetName = workbook.SheetNames.find(name => name.toLowerCase() === 'stats');
    if (!statsSheetName) throw new Error('STATS sheet not found in Excel file');

    const worksheet = workbook.Sheets[statsSheetName];

    // Convert sheet to array of rows (each row is an array of cell values)
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Update people array from row 2 (index 1), columns B (1), C (2), D (3), E (4)
    for (let i = 0; i < people.length; i++) {
      const row = rows[i + 1]; // Excel row 2 = index 1
      if (row) {
        // Column B (index 1) = Name
        if (row[1] !== undefined && row[1] !== null) {
          people[i].name = String(row[1]);
        }
        // Column C (index 2) = ID
        if (row[2] !== undefined && row[2] !== null) {
          people[i].id = String(row[2]);
        }
        // Column D (index 3) = Winrate
        if (row[3] !== undefined && row[3] !== null) {
          people[i].winrate = typeof row[3] === 'number' ? row[3].toFixed(1) + '%' : String(row[3]);
        }
        // Column E (index 4) = threeStarBases
        if (row[4] !== undefined && row[4] !== null) {
          people[i].threeStarBases = Number(row[4]);
        }
      }
    }

    console.log('Excel data loaded and people array updated:', people);

    // Optionally refresh UI
    if (typeof renderCarousel === 'function') renderCarousel();

  } catch (error) {
    console.error('Error loading Excel data:', error);
  }
}

window.addEventListener('load', () => {
  loadExcelData();
});
