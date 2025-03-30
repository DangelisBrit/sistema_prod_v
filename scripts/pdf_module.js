export default class moduloPdf{

    constructor(pdf){
        pdf = this.gerarPdf();
    }

    gerarPdf() {
    const element = document.getElementById('pdf-content');
    
    // Configurações do PDF
    const opt = {
        margin: 10,
        filename: 'op_.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    
    // Gerar PDF
    html2pdf().set(opt).from(element).save();
    }
}; 

