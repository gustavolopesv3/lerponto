import express from 'express';
const router = express.Router();
import { writeFileSync, readFileSync, appendFileSync, unlinkSync } from 'fs';

router.get('/', async (req, res) => {
  const { numPIS, date } = req.body;
  //let numPIS = 12869254735;
  //let date = 21062021;
  const data = readFileSync('saida.txt').toString().split('\n');
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
  res.send(cartaoDia);
});

router.get('/all', (req, res) => {
  const { numPIS } = req.body;

  const data = readFileSync('saida.txt').toString().split('\n');
  const cartaoDia = [];
  let batidas = [];
  let PIS = '';
  let dataPonto = '';
  data.forEach((item) => {
    if (item.substr(23, 11) == numPIS) {
      let hora = `${item.substr(18, 2)}`;
      let minuto = `${item.substr(20, 2)}`;
      let horario = `${hora}:${minuto}`;
      dataPonto = `${item.substr(10, 2)}/${item.substr(12, 2)}/${item.substr(
        14,
        4
      )}`;
      PIS = item.substr(23, 11);
      batidas.push(horario);

      //object
      cartaoDia.push({
        dataPonto,
        PIS,
        entrada: batidas[0],
        saidaIntervalo: batidas[1],
        voltaIntervalo: batidas[2],
        saida: batidas[3],
      });
    }
  });

  const byDate = cartaoDia.reduce((acc, cur) => {
    acc[cur.dataPonto] = acc[cur.dataPonto] || [];
    acc[cur.dataPonto].push(cur);
    return acc;
  });
  res.send(byDate);
});

export default router;
