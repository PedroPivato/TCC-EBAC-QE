import http from 'k6/http';
import { check, group, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';

export const options = {
  stages: [
    { duration: '20s', target: 20 },   // ramp-up
    { duration: '1m40s', target: 20 }, // carga constante (total: 2 min)
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
    checks: ['rate>0.95'],
  },
};

export default function () {
  group('Home', () => {
    const res = http.get(`${BASE_URL}/`);
    check(res, { 'home carregou': (r) => r.status === 200 });
  });
  sleep(1);

  group('Busca de produto', () => {
    const res = http.get(`${BASE_URL}/?s=jacket&post_type=product`);
    check(res, {
      'busca retornou 200': (r) => r.status === 200,
      'busca encontrou o produto': (r) => r.body.includes('Ingrid Running Jacket'),
    });
  });
  sleep(1);

  group('Detalhe do produto', () => {
    const res = http.get(`${BASE_URL}/product/ingrid-running-jacket/`);
    check(res, {
      'produto carregou': (r) => r.status === 200,
      'nome do produto na página': (r) => r.body.includes('Ingrid Running Jacket'),
    });
  });
  sleep(1);
}