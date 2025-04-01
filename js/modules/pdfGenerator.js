export function generatePdf() {
    // Clone a tabela antes de gerar o PDF
    const element = document.getElementById('dataTable');
    const clone = element.cloneNode(true);

    // Ajusta as imagens para o PDF
    const images = clone.querySelectorAll('.table-icon');
    images.forEach(img => {
        img.style.width = '20px';
        img.style.height = '20px';
    });

    const opt = {
        margin: 10,
        filename: 'produtos_cadastrados.pdf',
        html2canvas: {
            scale: 2,
            ignoreElements: (element) => element.classList.contains('ignore-pdf')
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(clone).save();
}