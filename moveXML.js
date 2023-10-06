const fs = require('fs');
const path = require('path');

const origemPath = path.join(__dirname, 'XMLS');
const logFilePath = path.join(__dirname, 'erros-mover.log');

function moveXML() {
    fs.readdir(origemPath, (err, files) => {
        if (err) {
            console.error('Erro ao ler o diretório de destino:', origemPath);
            salvarErroNoLog(`Erro ao ler o diretório de destino: ${origemPath}: ${err} // ${new Date()}`);
            return;
        }
    
        let contador = 0;
        let subpastaContador = 1;
    
        files.forEach(file => {
            // Verifica se é um arquivo .xml
            if (path.extname(file).toLowerCase() === '.xml') {
                if (contador === 0) {
                    const subpasta = path.join(origemPath, `subpasta - ${subpastaContador}`);
                    fs.mkdirSync(subpasta);
                    subpastaContador++;
                }
    
                const origemArquivo = path.join(origemPath, file);
                const destinoArquivo = path.join(origemPath, `subpasta - ${subpastaContador - 1}`, file);
    
                fs.rename(origemArquivo, destinoArquivo, err => {
                    if (err) {
                        console.error(`Erro ao mover o arquivo ${file}:`, err);
                        salvarErroNoLog(`Erro ao mover o arquivo: ${file}: ${err} // ${new Date()}`);
                    } else {
                        console.log(`Arquivo ${file} movido para subpasta: ${subpastaContador - 1}.`);
                    }
                });
    
                contador++;
                if (contador === 1000) {
                    contador = 0;
                }
            }
        });
    });
}

function salvarErroNoLog(erroMsg) {
    fs.appendFile(logFilePath, `${erroMsg}\n`, err => {
      if (err) {
        console.error('Erro ao salvar erro no log:', err);
      }
    });
}

moveXML();