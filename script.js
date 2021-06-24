// //import { readFile } from 'fs';

// import fs from 'fs';

// const arr_file = fs
//   .readFileSync('00004004330043130.txt')
//   .toString()
//   .split('\n');
// const filtred = [];

// arr_file.map((item) => {
//   if (item.length == 39) {
//     //console.log(item);
//     filtred.push(item);
//     fs.writeFileSync('output.txt', item);
//   }
// });
import { time } from 'console';
import { writeFileSync, readFileSync, appendFileSync, unlinkSync } from 'fs';

function exportarBatidas() {
  unlinkSync('saida.txt');
  const data = readFileSync('dadosdoponto.txt').toString().split('\n');
  data.map((item) => {
    if (item.length == 39) {
      //console.log(item);
      appendFileSync('saida.txt', item);
    }
  });
  console.log('Base atualizada');
}
exportarBatidas();

function lerTodosRegistros(numPIS) {
  const data = readFileSync('saida.txt').toString().split('\n');
  const horasTrabalhadas = [];
  data.forEach((item) => {
    if (item.substr(23, 11) == numPIS) {
      let hora = `${item.substr(18, 2)}`;
      let minuto = `${item.substr(20, 2)}`;
      let horario = `${hora}:${minuto}`;
      let dataPonto = `${item.substr(10, 2)}/${item.substr(
        12,
        2
      )}/${item.substr(14, 4)}`;
      let PIS = item.substr(23, 11);
      console.log(`Bateu ponto: ${horario} | data: ${dataPonto} | PIS ${PIS}`);

      horasTrabalhadas.push({
        ponto: {
          hora: parseInt(hora),
          minuto: parseInt(minuto),
          segundos: 0,
          completeData: dataPonto,
        },
      });
    }
  });
  //console.log(horasTrabalhadas);
}
//lerTodosRegistros(12869254735);

function lerRegistro(numPIS, date) {
  const data = readFileSync('saida.txt').toString().split('\n');
  const horasTrabalhadas = [];
  const cartaoDia = [];
  let batidas = [];
  let PIS = '';
  let dataPonto = '';
  data.forEach((item) => {
    if ((item.substr(23, 11) == numPIS) & (item.substr(10, 8) == date)) {
      let hora = `${item.substr(18, 2)}`;
      let minuto = `${item.substr(20, 2)}`;
      let horario = `${hora}:${minuto}`;
      dataPonto = `${item.substr(10, 2)}/${item.substr(12, 2)}/${item.substr(
        14,
        4
      )}`;
      PIS = item.substr(23, 11);
      batidas.push(horario);
    }
  });

  cartaoDia.push({
    dataPonto,
    PIS,
    entrada: batidas[0],
    saidaIntervalo: batidas[1],
    voltaIntervalo: batidas[2],
    saida: batidas[3],
  });
  console.log(cartaoDia);
}
//lerRegistro(12869254735, 21062021);
