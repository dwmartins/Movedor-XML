const fs = require('fs');
const path = require('path');

const origemPath = path.join(__dirname, 'XMLS-para-copiar');
const destinoPath = path.join(__dirname, 'XMLS');
const logFilePath = path.join(__dirname, 'erros-copiar.log');

function moveArquivosParaDestino(diretorio) {
  // Lê o conteúdo da pasta
  fs.readdir(diretorio, (err, files) => {
    if (err) {
      salvarErroNoLog(`Erro ao ler o diretório ${diretorio}:`, new Date());
      console.error(`Erro ao ler o diretório ${diretorio}:`, err);
      return;
    }

    // Itera sobre cada item no diretório
    files.forEach(item => {
      const itemPath = path.join(diretorio, item);

      // Verifica se é um arquivo
      if (fs.statSync(itemPath).isFile() && path.extname(item).toLowerCase() === '.xml') {
        const destinoArquivo = path.join(destinoPath, item);

        // Copia o arquivo para a pasta de destino
        fs.copyFile(itemPath, destinoArquivo, err => {
          if (err) {
            console.error(`Erro ao copiar o arquivo ${item}:`, err);
            salvarErroNoLog(`Erro ao copiar o arquivo ${item}: ${err}// ${new Date()}`);
          } else {
            console.log(`Arquivo ${item} copiado com sucesso para a pasta de destino.`);
          }
        });
      } else if (fs.statSync(itemPath).isDirectory()) {
        // É um diretório, chama a função recursivamente para processar seus conteúdos
        moveArquivosParaDestino(itemPath);
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

// Verifica se a pasta de destino existe; se não, cria a pasta
fs.mkdir(destinoPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Erro ao criar a pasta de destino:', err);
    salvarErroNoLog(`Erro ao criar a pasta de destino: ${err} // ${new Date()}`);
    return;
  }

  // Chama a função para iniciar o processo de mover os arquivos
  moveArquivosParaDestino(origemPath);
});
